import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

//loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Textures 
//earth texture
const earthTexture = new THREE.TextureLoader() .load('Earth_Water1.png')

// Objects
// Sphere object
const geometry = new THREE.SphereBufferGeometry(.8, 64, 64) //(radius, x-polygons, y-polygons)

const loader = new GLTFLoader();

//matrix
const m = new THREE.Matrix4();

m.makeScale(0.08, 0.08, 0.08);

loader.load( 'scene.gltf', function ( gltf ) {
    gltf.scene.applyMatrix4(m)
    gltf.scene.position.y=0.9
	scene.add( gltf.scene );

}, undefined, function ( error ) {
	console.error( error );

} );

// Materials

const material = new THREE.MeshStandardMaterial({map:earthTexture}) //standard material with earth texture


// Mesh
const sphere = new THREE.Mesh(
    geometry,material)          //combinds sphere with material and texture
    sphere.position.x=0
    sphere.rotation.y=-49.95
    scene.add(sphere)               //adds globe to scene

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)    //(light-color, intensity)
pointLight.position.x = 3
pointLight.position.y = 2                               //light position x y z
pointLight.position.z = 4
scene.add(pointLight)                                   // adds light to scene

const pointLight_1 = new THREE.PointLight(0xffffff, 1)    //(light-color, intensity)
pointLight_1.position.x = -3
pointLight_1.position.y = 2                               //light position x y z
pointLight_1.position.z = 4
scene.add(pointLight_1)                                   // adds light to scene


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 100) //(fov, aspect-ratio, Camera frustum near plane, Camera frustum far plane)
camera.position.x = 0
camera.position.y = .3                      //camera position
camera.position.z = 2
scene.add(camera)                          //adds to scene

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    // const elapsedTime = clock.getElapsedTime()

    // // Update objects
    // sphere.rotation.y = -0.6 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()