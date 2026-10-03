"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";

const CARD_W = 1.6;
const CARD_H = 2.25;
const CARD_T = 0.05;
const FACE_W = 1.5;
const FACE_H = 2.15;
const STRAP_W = 0.24;
const STRAP_TILE = STRAP_W * 8;
const STRAP_POINTS = 28;

export type LanyardProps = {
  active?: boolean;
  name: string;
  initials: string;
  tag: string;
  description: string;
  photoSrc: string;
  /** Foto khusus untuk sisi belakang kartu. Kalau tidak diisi, pakai photoSrc yang sama. */
  backPhotoSrc?: string;
};

type CardContent = Pick<
  LanyardProps,
  "name" | "initials" | "tag" | "description"
>;

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Arial, Helvetica, sans-serif";

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const cut = lines.slice(0, maxLines);
    cut[maxLines - 1] = cut[maxLines - 1].replace(/\s*\S*$/, "") + "…";
    return cut;
  }
  return lines;
}

function drawFront(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement | null,
  c: CardContent
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const border = 16;
  const pad = border + 16;

  // Bingkai luar: gradasi ungu -> biru (warna khas situs)
  const frame = ctx.createLinearGradient(0, 0, w, h);
  frame.addColorStop(0, "#a78bfa");
  frame.addColorStop(0.5, "#7c3aed");
  frame.addColorStop(1, "#3b82f6");
  ctx.fillStyle = frame;
  ctx.fillRect(0, 0, w, h);

  // Isi kartu: gelap, dengan cahaya memancar dari sudut atas
  const innerX = border;
  const innerY = border;
  const innerW = w - border * 2;
  const innerH = h - border * 2;

  ctx.save();
  ctx.beginPath();
  ctx.rect(innerX, innerY, innerW, innerH);
  ctx.clip();

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#1e1b4b");
  bg.addColorStop(1, "#0a0a0f");
  ctx.fillStyle = bg;
  ctx.fillRect(innerX, innerY, innerW, innerH);

  ctx.save();
  ctx.translate(innerX + innerW * 0.5, innerY + innerH * 0.18);
  ctx.globalAlpha = 0.18;
  for (let i = 0; i < 24; i++) {
    ctx.rotate((Math.PI * 2) / 24);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#a78bfa");
    grad.addColorStop(1, "rgba(167,139,250,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(-3, 0, 6, h);
  }
  ctx.restore();
  ctx.globalAlpha = 1;
  ctx.restore();

  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  ctx.strokeRect(innerX, innerY, innerW, innerH);

  // Name plate
  const plateY = pad;
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(pad, plateY, w - pad * 2, 60);
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, plateY, w - pad * 2, 60);

  const nameMax = w - pad * 2 - 16 - 56;
  let size = 26;
  ctx.font = `bold ${size}px ${SANS}`;
  while (ctx.measureText(c.name.toUpperCase()).width > nameMax && size > 13) {
    size -= 1;
    ctx.font = `bold ${size}px ${SANS}`;
  }
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText(c.name.toUpperCase(), pad + 14, plateY + 30);

  ctx.beginPath();
  ctx.arc(w - pad - 30, plateY + 30, 20, 0, Math.PI * 2);
  const badgeGrad = ctx.createLinearGradient(w - pad - 50, 0, w - pad - 10, 0);
  badgeGrad.addColorStop(0, "#7c3aed");
  badgeGrad.addColorStop(1, "#3b82f6");
  ctx.fillStyle = badgeGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 16px ${SANS}`;
  ctx.textAlign = "center";
  ctx.fillText(c.initials, w - pad - 30, plateY + 30);

  // Foto
  const py = plateY + 76;
  const ps = w - pad * 2;
  ctx.fillStyle = "#000";
  ctx.fillRect(pad, py, ps, ps);
  if (img && img.width > 0) {
    const s = Math.max(ps / img.width, ps / img.height);
    const dw = img.width * s;
    const dh = img.height * s;
    ctx.save();
    ctx.beginPath();
    ctx.rect(pad, py, ps, ps);
    ctx.clip();
    ctx.drawImage(img, pad + (ps - dw) / 2, py, dw, dh);
    ctx.restore();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 3;
  ctx.strokeRect(pad, py, ps, ps);

  // Tag + deskripsi
  const by = py + ps + 16;
  const bh = h - by - pad;
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(pad, by, w - pad * 2, bh);
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, by, w - pad * 2, bh);

  ctx.textAlign = "left";
  ctx.fillStyle = "#c4b5fd";
  ctx.font = `bold 20px ${SANS}`;
  ctx.fillText(`[${c.tag}]`, pad + 14, by + 26);

  ctx.font = `15px ${SANS}`;
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  const lines = wrapText(ctx, c.description, w - pad * 2 - 28, 3);
  lines.forEach((l, i) => ctx.fillText(l, pad + 14, by + 54 + i * 19));
}

function drawBack(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement | null,
  c: CardContent
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#1e1b4b");
  bg.addColorStop(1, "#0a0a0f");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const frameGrad = ctx.createLinearGradient(0, 0, w, h);
  frameGrad.addColorStop(0, "#a78bfa");
  frameGrad.addColorStop(1, "#3b82f6");
  ctx.strokeStyle = frameGrad;
  ctx.lineWidth = 10;
  ctx.strokeRect(14, 14, w - 28, h - 28);

  // Foto bulat (ganti dari teks inisial)
  const cx = w / 2;
  const cy = h / 2 - 30;
  const r = 150;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (img && img.width > 0) {
    const s = Math.max((r * 2) / img.width, (r * 2) / img.height);
    const dw = img.width * s;
    const dh = img.height * s;
    ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
  } else {
    ctx.fillStyle = "#000";
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  }
  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold 26px ${SERIF}`;
  ctx.fillText(c.name.toUpperCase(), w / 2, h / 2 + 200);
  ctx.font = `16px ${SANS}`;
  ctx.fillStyle = "#c4b5fd";
  ctx.fillText("PORTFOLIO", w / 2, h / 2 + 235);
}

function drawStrap(canvas: HTMLCanvasElement, c: CardContent) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = "#0a0a0b";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(0, 6, w, 3);
  ctx.fillRect(0, h - 9, w, 3);

  ctx.strokeStyle = "#ffffff";
  ctx.fillStyle = "#ffffff";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(70, h / 2, 34, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = `bold 40px ${SANS}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(c.initials.charAt(0), 70, h / 2 + 2);

  const maxW = w - 150 - 40;
  let size = 58;
  ctx.font = `bold ${size}px ${SANS}`;
  while (ctx.measureText(c.name).width > maxW && size > 20) {
    size -= 2;
    ctx.font = `bold ${size}px ${SANS}`;
  }
  ctx.textAlign = "left";
  ctx.fillText(c.name, 130, h / 2 + 3);
}

function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

function makeTexture(canvas: HTMLCanvasElement, repeat = false) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (repeat) t.wrapS = THREE.RepeatWrapping;
  return t;
}

function Band({
  content,
  photoSrc,
  backPhotoSrc,
}: {
  content: CardContent;
  photoSrc: string;
  backPhotoSrc: string;
}) {
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const [dragged, setDragged] = useState<false | THREE.Vector3>(false);
  const [hovered, setHovered] = useState(false);

  const tmpRef = useRef({
    vec: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    ang: new THREE.Vector3(),
    rot: new THREE.Vector3(),
    lerp1: new THREE.Vector3(),
    lerp2: new THREE.Vector3(),
    lerpReady: false,
  });

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()],
        false,
        "chordal"
      ),
    []
  );

  const { frontCanvas, backCanvas, strapCanvas } = useMemo(() => {
    const f = document.createElement("canvas");
    f.width = 600;
    f.height = 860;
    const b = document.createElement("canvas");
    b.width = 600;
    b.height = 860;
    const s = document.createElement("canvas");
    s.width = 1024;
    s.height = 128;
    return { frontCanvas: f, backCanvas: b, strapCanvas: s };
  }, []);

  const frontTex = useMemo(() => makeTexture(frontCanvas), [frontCanvas]);
  const backTex = useMemo(() => makeTexture(backCanvas), [backCanvas]);
  const strapTex = useMemo(() => makeTexture(strapCanvas, true), [strapCanvas]);

  const loadedFrontImgRef = useRef<HTMLImageElement | null>(null);
  const loadedBackImgRef = useRef<HTMLImageElement | null>(null);

  // Muat foto depan
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      loadedFrontImgRef.current = img;
      drawFront(frontCanvas, img, content);
      frontTex.needsUpdate = true;
    };
    img.src = photoSrc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoSrc]);

  // Muat foto belakang (boleh beda dari foto depan)
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      loadedBackImgRef.current = img;
      drawBack(backCanvas, img, content);
      backTex.needsUpdate = true;
    };
    img.src = backPhotoSrc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backPhotoSrc]);

  // Gambar ulang teks kartu setiap kali nama/tag/deskripsi berubah (mis. ganti bahasa)
  useEffect(() => {
    drawFront(frontCanvas, loadedFrontImgRef.current, content);
    drawBack(backCanvas, loadedBackImgRef.current, content);
    drawStrap(strapCanvas, content);
    frontTex.needsUpdate = true;
    backTex.needsUpdate = true;
    strapTex.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.name, content.initials, content.tag, content.description]);

  useEffect(() => {
    return () => {
      frontTex.dispose();
      backTex.dispose();
      strapTex.dispose();
    };
  }, [frontTex, backTex, strapTex]);

  const bodyGeometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRectShape(CARD_W, CARD_H, 0.09), {
      depth: CARD_T,
      bevelEnabled: false,
    });
    g.translate(0, 0, -CARD_T / 2);
    return g;
  }, []);

  const strapGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(STRAP_POINTS * 2 * 3), 3)
    );
    g.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array(STRAP_POINTS * 2 * 2), 2)
    );
    const index: number[] = [];
    for (let i = 0; i < STRAP_POINTS - 1; i++) {
      const a = i * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    g.setIndex(index);
    return g;
  }, []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, CARD_H / 2 + 0.325, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const tmp = tmpRef.current;
    const { vec, dir, ang, rot } = tmp;

    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      if (!tmp.lerpReady) {
        tmp.lerp1.copy(j1.current.translation());
        tmp.lerp2.copy(j2.current.translation());
        tmp.lerpReady = true;
      }
      const smooth = (v: THREE.Vector3, body: RapierRigidBody) => {
        const dist = Math.max(0.1, Math.min(1, v.distanceTo(body.translation())));
        v.lerp(body.translation() as THREE.Vector3, delta * dist * 50);
      };
      smooth(tmp.lerp1, j1.current);
      smooth(tmp.lerp2, j2.current);

      curve.points[0].copy(fixed.current.translation());
      curve.points[1].copy(tmp.lerp1);
      curve.points[2].copy(tmp.lerp2);
      curve.points[3].copy(j3.current.translation());
      const pts = curve.getPoints(STRAP_POINTS - 1);

      const pos = strapGeometry.attributes.position as THREE.BufferAttribute;
      const uv = strapGeometry.attributes.uv as THREE.BufferAttribute;
      let s = 0;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (i > 0) s += p.distanceTo(pts[i - 1]);
        const a = pts[Math.max(i - 1, 0)];
        const b = pts[Math.min(i + 1, pts.length - 1)];
        let tx = b.x - a.x;
        let ty = b.y - a.y;
        const len = Math.hypot(tx, ty) || 1;
        tx /= len;
        ty /= len;
        const nx = -ty;
        const ny = tx;
        const hw = STRAP_W / 2;
        pos.setXYZ(i * 2, p.x - nx * hw, p.y - ny * hw, p.z);
        pos.setXYZ(i * 2 + 1, p.x + nx * hw, p.y + ny * hw, p.z);
        uv.setXY(i * 2, s / STRAP_TILE, 0);
        uv.setXY(i * 2 + 1, s / STRAP_TILE, 1);
      }
      pos.needsUpdate = true;
      uv.needsUpdate = true;
      strapGeometry.computeBoundingSphere();

      ang.copy(card.current.angvel() as THREE.Vector3);
      rot.set(
        card.current.rotation().x,
        card.current.rotation().y,
        card.current.rotation().z
      );
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  const segment = {
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" {...segment} />
        <RigidBody ref={j1} position={[0.5, 0, 0]} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[1, 0, 0]} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j3} position={[1.5, 0, 0]} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          type={dragged ? "kinematicPosition" : "dynamic"}
          {...segment}
        >
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.02]} />
          <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e) => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              setDragged(false);
            }}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              if (!card.current) return;
              setDragged(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(tmpRef.current.vec.copy(card.current.translation() as THREE.Vector3))
              );
            }}
          >
            <mesh geometry={bodyGeometry}>
              <meshStandardMaterial color="#8b93b8" roughness={0.35} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0, CARD_T / 2 + 0.002]}>
              <planeGeometry args={[FACE_W, FACE_H]} />
              <meshBasicMaterial map={frontTex} toneMapped={false} />
            </mesh>
            <mesh position={[0, 0, -CARD_T / 2 - 0.002]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[FACE_W, FACE_H]} />
              <meshBasicMaterial map={backTex} toneMapped={false} />
            </mesh>
            <mesh position={[0, CARD_H / 2 + 0.1, 0]}>
              <boxGeometry args={[0.34, 0.2, 0.09]} />
              <meshStandardMaterial color="#111114" metalness={0.8} roughness={0.35} />
            </mesh>
            <mesh position={[0, CARD_H / 2 + 0.27, 0]}>
              <torusGeometry args={[0.09, 0.028, 12, 24]} />
              <meshStandardMaterial color="#111114" metalness={0.8} roughness={0.35} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      <mesh geometry={strapGeometry} frustumCulled={false}>
        <meshBasicMaterial
          map={strapTex}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

export function Lanyard({
  active = true,
  name,
  initials,
  tag,
  description,
  photoSrc,
  backPhotoSrc,
}: LanyardProps) {
  const [camZ, setCamZ] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 13 : 17
  );

  useEffect(() => {
    const update = () => setCamZ(window.innerWidth < 768 ? 13 : 17);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const content = useMemo(
    () => ({ name, initials, tag, description }),
    [name, initials, tag, description]
  );

  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, camZ], fov: 20 }}
      gl={{ alpha: true, antialias: true }}
      style={{ touchAction: "pan-y" }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 6, 8]} intensity={2.2} />
      <Physics gravity={[0, -40, 0]} timeStep={1 / 60} paused={!active}>
        <Band content={content} photoSrc={photoSrc} backPhotoSrc={backPhotoSrc ?? photoSrc} />
      </Physics>
    </Canvas>
  );
}