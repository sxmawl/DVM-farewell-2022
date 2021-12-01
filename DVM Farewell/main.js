import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(15, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff62445 });

const torus = new THREE.Mesh(geometry, material);

torus.position.x = 10;
scene.add(torus);

// const pointLight = new THREE.PointLight(0xffffff);

// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// const helper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z -= 0.03;

  controls.update();
}

animate();

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);

}


Array(200).fill().forEach(addStar);

const texture = new THREE.TextureLoader().load('bgabstract.jpeg');

scene.background = texture;


const profileMaterial = new THREE.TextureLoader().load('anupam.jpeg');

const profile = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: profileMaterial})
)

profile.position.x = 10;
profile.position.z= 2;

scene.add(profile);





////////// Scroll behaviour////////

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  profile.rotation.x += 0.01
  profile.rotation.y += 0.02
  
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.012;
  camera.position.z = t * -0.050;

}

document.body.onscroll = moveCamera;