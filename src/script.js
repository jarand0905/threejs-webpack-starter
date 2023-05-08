import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//høydegrader og breddegrader
let t = 180
let lat1 = 45
let lat2 = 118
let lat = lat1
let deltalat = (lat2-lat1)/t
let latrad = lat/360 * 2 * Math.PI
let long1 = 100
let long2 = 34
let long = long1
let deltalong =(long2-long1)/t
let longrad = long/360 * 2 * Math.PI
let radius = 0.9
let maxradius = 1.5
let deltaradius = radius/maxradius

//regner ut x y z koordinater ved hjelp av lengde og breddegrader
let x1 = radius * Math.sin(latrad) * Math.cos(longrad)
let y1 = radius * Math.sin(latrad) * Math.sin(longrad)
let z1 = radius * Math.cos(latrad)

function xyz(){
    x1 = radius * Math.sin(latrad) * Math.cos(longrad)
    y1 = radius * Math.sin(latrad) * Math.sin(longrad)
    z1 = radius * Math.cos(latrad)
}
// Debug
const gui = new dat.GUI()
let model = null;
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
    model = gltf.scene;
    
    model.applyMatrix4(m)
    model.position.y=0.9
    model.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI)
    scene.add( model );

}, undefined, function ( error ) {
    console.error( error );

} );

// Materials

const material = new THREE.MeshStandardMaterial({map:earthTexture}) //standard material with earth texture


// Mesh
const sphere = new THREE.Mesh(
    geometry,material)          //combinds sphere with material and texture
    sphere.position.x=0
    sphere.rotation.y=60.95
    sphere.rotation.x=Math.PI/9
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
camera.position.y = 0                      //camera position
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

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    if(model != null ){
    // model.rotation.y = 0.6 * elapsedTime
    }
    

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
let pos = new THREE.Matrix4();

const asdf = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // // Update objects
   
    //pos.setPosition(0,0,0)
    if(model != null ){
        // model.applyMatrix4(pos)
        // model.updateMatrix()
        model.position.set(x1,z1,y1)
        // model.position.set(1,0,0)
    }
    

    // Update Orbital Controls
    // controls.update()

    // Render

    // Call tick again on the next frame

    // window.requestAnimationFrame(asdf)
}
let frame = 0
const animate = () =>
{
    // Update objects
    if(model != null ){
        model.position.set(x1,z1,y1)
        lat = lat + deltalat
        latrad = lat/360 * 2 * Math.PI
        long = long + deltalong
        longrad = long/360 * 2 * Math.PI
        xyz()
        model.lookAt(x1,z1,y1)
        camera.lookAt(x1,z1,y1)
        model.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI/2)
        model.rotateOnAxis(new THREE.Vector3(1, 0, 0), ((longrad-Math.PI/2)*-1)*2)
        //console.log((longrad-Math.PI/2)*-1)*2
        frame++
    }
    
    // Call tick again on the next frame
    if (frame <= t) {
        window.requestAnimationFrame(animate)
    }
}


window.qwer=function qwer(){
    frame = 0
    lat = lat1
    long = long1
    xyz()
    animate()
}

window.slider = function slider(){
    var grader = document.getElementById("latSlider");
    lat = grader.value
    latrad = lat/360 * 2 * Math.PI
    xyz()
    model.position.set(x1,z1,y1)
}

window.value=function value(){

}

window.hello=function hello(){
    console.log("hello")
}