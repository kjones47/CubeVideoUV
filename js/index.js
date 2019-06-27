
var camera;
var scene;
var renderer;
//VARIABLES
var mesh;
var videoTexture;
var video;
var stats;

var isUserInteracting = false,
	lon = 0, lat = 0,
	phi = 0, theta = 0,
	distance = 50,
	onPointerDownPointerX = 0,
	onPointerDownPointerY = 0,
	onPointerDownLon = 0,
	onPointerDownLat = 0;

function init() {
	//STATS			
	stats = new Stats();
	document.body.appendChild(stats.dom);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.target = new THREE.Vector3( 0, 0, 0 );

//  var light = new THREE.DirectionalLight(0xffffff);
//  light.position.set(0, 1, 1).normalize();
//  scene.add(light);

  var ambient = new THREE.AmbientLight( 0xffffff );
  scene.add( ambient );
  
  var geometry = new THREE.CubeGeometry(100, 100, 100);

  video = document.getElementById( 'video' );
  video.load();
  videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;

  var material = new THREE.MeshPhongMaterial({ map: videoTexture, side:THREE.DoubleSide });
   geometry.scale( 1, -1, 1);

  var face1 = [new THREE.Vector2(0, .5), new THREE.Vector2(.3333, .5), new THREE.Vector2(.3333, 1), new THREE.Vector2(0, 1)];
  var face2 = [new THREE.Vector2(.3333, .5), new THREE.Vector2(.6666, .5), new THREE.Vector2(.6666, 1), new THREE.Vector2(.3333, 1)];
  var face3 = [new THREE.Vector2(.6666, .5), new THREE.Vector2(1, .5), new THREE.Vector2(1, 1), new THREE.Vector2(.6666, 1)];
  var face4 = [new THREE.Vector2(0, 0), new THREE.Vector2(.3333, 0), new THREE.Vector2(.3333, .5), new THREE.Vector2(0, .5)];
  var face5 = [new THREE.Vector2(.3333, 0), new THREE.Vector2(.6666, 0), new THREE.Vector2(.6666, .5), new THREE.Vector2(.3333, .5)];
  var face6 = [new THREE.Vector2(.6666, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .5), new THREE.Vector2(.6666, .5)];

  geometry.faceVertexUvs[0] = [];

  geometry.faceVertexUvs[0][0] = [face1[0], face1[1], face1[3]];
  geometry.faceVertexUvs[0][1] = [face1[1], face1[2], face1[3]];

  geometry.faceVertexUvs[0][2] = [face2[0], face2[1], face2[3]];
  geometry.faceVertexUvs[0][3] = [face2[1], face2[2], face2[3]];

  geometry.faceVertexUvs[0][4] = [face3[0], face3[1], face3[3]];
  geometry.faceVertexUvs[0][5] = [face3[1], face3[2], face3[3]];

  geometry.faceVertexUvs[0][6] = [face4[0], face4[1], face4[3]];
  geometry.faceVertexUvs[0][7] = [face4[1], face4[2], face4[3]];

  geometry.faceVertexUvs[0][8] = [face5[0], face5[1], face5[3]];
  geometry.faceVertexUvs[0][9] = [face5[1], face5[2], face5[3]];

  geometry.faceVertexUvs[0][10] = [face6[0], face6[1], face6[3]];
  geometry.faceVertexUvs[0][11] = [face6[1], face6[2], face6[3]];
  

  mesh = new THREE.Mesh(geometry, material);
 // mesh.position.z = -50;
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'wheel', onDocumentMouseWheel, false );
				window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function onDocumentMouseUp() {
				isUserInteracting = false;
			}

			function onDocumentMouseDown( event ) {
				event.preventDefault();
				isUserInteracting = true;
				onPointerDownPointerX = event.clientX;
				onPointerDownPointerY = event.clientY;
				onPointerDownLon = lon;
				onPointerDownLat = lat;

			}

			function onDocumentMouseMove( event ) {
				if ( isUserInteracting === true ) {
					lon = ( event.clientX - onPointerDownPointerX ) * 0.15 + onPointerDownLon;
					lat = ( event.clientY - onPointerDownPointerY ) * 0.15 + onPointerDownLat;
				}
			}

			function onDocumentMouseWheel( event ) {
				distance += event.deltaY * 0.5; //speed of movement
				distance = THREE.Math.clamp( distance, 1, 50 );
			}
			
			function animate() {
				requestAnimationFrame( animate );
				update();
			}

			function update() {	
				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = THREE.Math.degToRad( 90 - lat );
				theta = THREE.Math.degToRad( lon );	
				camera.position.x = distance * Math.sin( phi ) * Math.cos( theta );
				camera.position.y = distance * Math.cos( phi );
				camera.position.z = distance * Math.sin( phi ) * Math.sin( theta );
				camera.lookAt( camera.target );				
				renderer.render( scene, camera );
			}
			
init();
animate();
