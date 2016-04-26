var THREE = require('three');


var scene = new THREE.Scene();
scene.fog = THREE.FogExp2( 0xff0000, 0.1);

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.DodecahedronGeometry(2,3);
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
var cube = new THREE.Mesh( geometry, material );
scene.add(cube);



camera.position.z = 5;

console.log(cube);

var render = function () {

	requestAnimationFrame( render );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

render();