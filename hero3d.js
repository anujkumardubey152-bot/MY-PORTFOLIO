
/* =========================================
   3D PARTICLE HERO
   SIGNAL IN THE NOISE
========================================= */

// Load Three.js from CDN
const threeScript = document.createElement("script");
threeScript.src =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

threeScript.onload = initializeHero3D;
document.head.appendChild(threeScript);


function initializeHero3D() {

  const container = document.getElementById("hero-canvas");

  if (!container || !window.THREE) return;

  const THREE = window.THREE;

  // SCENE
  const scene = new THREE.Scene();

  // CAMERA
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  camera.position.z = 12;

  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  container.appendChild(renderer.domElement);


  // PARTICLE GEOMETRY
  const particleCount = 4500;

  const positions = new Float32Array(particleCount * 3);

  const colors = new Float32Array(particleCount * 3);

  const originalPositions = new Float32Array(particleCount * 3);

  const colorCyan = new THREE.Color("#7ce7ff");
  const colorViolet = new THREE.Color("#a99bff");

  for (let i = 0; i < particleCount; i++) {

    // Sphere distribution
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;

    const radius = 3.2 + Math.random() * 0.8;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    originalPositions[i * 3] = x;
    originalPositions[i * 3 + 1] = y;
    originalPositions[i * 3 + 2] = z;

    // Mix cyan and violet
    const color = colorCyan.clone().lerp(
      colorViolet,
      Math.random()
    );

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }


  // BUFFER GEOMETRY
  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
  );


  // PARTICLE MATERIAL
  const material = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });


  // PARTICLE OBJECT
  const particles = new THREE.Points(
    geometry,
    material
  );

  scene.add(particles);


  // MOUSE INTERACTION
  let mouseX = 0;
  let mouseY = 0;

  let targetX = 0;
  let targetY = 0;

  window.addEventListener("mousemove", (event) => {

    mouseX =
      (event.clientX / window.innerWidth - 0.5) * 0.5;

    mouseY =
      (event.clientY / window.innerHeight - 0.5) * 0.5;

  });


  // ANIMATION
  const clock = new THREE.Clock();

  function animate() {

    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.03;
    targetY += (mouseY - targetY) * 0.03;

    particles.rotation.y = elapsed * 0.08 + targetX;
    particles.rotation.x = elapsed * 0.04 + targetY;

    // Gentle particle movement
    const positionAttribute =
      geometry.attributes.position;

    for (let i = 0; i < particleCount; i++) {

      const index = i * 3;

      const originalX = originalPositions[index];
      const originalY = originalPositions[index + 1];
      const originalZ = originalPositions[index + 2];

      const wave =
        Math.sin(elapsed * 1.2 + originalX * 2) * 0.035;

      positionAttribute.array[index] =
        originalX + wave;

      positionAttribute.array[index + 1] =
        originalY + Math.cos(elapsed + originalZ) * 0.025;

    }

    positionAttribute.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();


  // RESPONSIVE RESIZE
  window.addEventListener("resize", () => {

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

  });

}
