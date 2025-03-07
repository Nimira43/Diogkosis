import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
)
camera.position.z = 5
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: 0xff4500 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const ground = new THREE.Mesh(
  new THREE.BoxGeometry(5, 0.5, 10),
  new THREE.MeshPhongMaterial({
    color: 0x008080
  })
)
ground.position.y = -2
scene.add(ground)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.z = 3
scene.add(light)

const animate = () => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()