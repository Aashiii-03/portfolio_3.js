import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.getElementById("bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(75);

renderer.render(scene, camera);

const torusTexture = new THREE.TextureLoader().load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg");

const torusNormalTexture = new THREE.TextureLoader().load("normal.jpg");

const geometry = new THREE.TorusGeometry(18, 6, 10, 80);
const material = new THREE.MeshStandardMaterial({ map: torusTexture, normalMap: torusNormalTexture });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 1000, 1000);
pointLight.position.set(20, 5, 17);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement); // this will listen to dom events on mouse and update the camera position

function addStar() {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(300).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
// spaceTexture.encoding = THREE.sRGBEncoding; // depreceated
spaceTexture.colorSpace = THREE.SRGBColorSpace; // this works the same
scene.background = spaceTexture;

//squareAvatar
const avatarTexture = new THREE.TextureLoader().load(`data:image/png;base64,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`);
avatarTexture.colorSpace = THREE.SRGBColorSpace;
const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(12, 12, 12),
  new THREE.MeshBasicMaterial({ map: avatarTexture })
);

scene.add(avatar);

//moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace;

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
    normalMapType: THREE.ObjectSpaceNormalMap,
    //  roughness:1
  })
);
moon.position.z = 40;
moon.position.x = 30;

scene.add(moon);

function moveCamera() {
 
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

 avatar.rotation.y += 0.075;
 avatar.rotation.z += 0.05;
 console.log("gygf");

}
window.addEventListener("scroll", moveCamera);
//document.getElementById("bg").onscroll = moveCamera();// the element with id = "bg" is not scrollable. thus, scroll event wasn't triggered.

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}
animate();






