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

camera.position.setX(0);

renderer.render(scene, camera);

const torusTexture =  new THREE.TextureLoader().load('download.jpeg')
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ map: torusTexture });

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// const pointLight = new THREE.PointLight(0xffffff);

// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// const helper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls);


//////////////// RANDOM STARS ////////////


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x,y,z);
  scene.add(star);

}


Array(500).fill().forEach(addStar);

/// Background /////////

const texture = new THREE.TextureLoader().load('bgabstract.jpeg');
scene.background = texture;

////////////Profile image //////

// const profileMaterial = new THREE.TextureLoader().load('anupam.jpeg');
// const profile = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial({map: profileMaterial})
// )

// scene.add(profile);

////////////////////// Icosahedron //////////////////////

const isoTexture = new THREE.TextureLoader().load('isotext.jpeg')

const iso = new THREE.Mesh(
  new THREE.SphereGeometry(5),
  new THREE.MeshStandardMaterial({ map: isoTexture })
)

iso.position.z = 10;
iso.position.x = 20;

scene.add(iso);

////////// Scroll behaviour////////

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  // profile.rotation.z += 0.01
  // profile.rotation.y += 0.02
  
  camera.position.x = t * -0.02;
  camera.position.y = t * -0.02;
  camera.position.z = t * -0.11;

}

document.body.onscroll = moveCamera;




////////////// Animate //////////////

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  torus.rotation.x += 0.006;
  torus.rotation.y += 0.006;
  torus.rotation.z -= 0.002;

  iso.rotation.z += 0.02; 
  iso.position.x -= 0.005; 
  iso.position.y += 0.005; 
  iso.position.z -= 0.005; 

  controls.update();
}

animate();