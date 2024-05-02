/**
 * https://github.com/jeromeetienne/threex.planets/blob/master/threex.planets.js
 */
import * as THREE from 'three'
import earth_bg from '../assets/images/earth_bg.png'

//const earth_bg = require('@/assets/images/earth_bg.png')

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createAtmosphereMaterial = function () {
  const vertexShader = [
    'varying vec3	vVertexWorldPosition;',
    'varying vec3	vVertexNormal;',

    'void main(){',
    '	vVertexNormal	= normalize(normalMatrix * normal);',

    '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;',

    '	// set gl_Position',
    '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n')
  const fragmentShader = [
    'uniform vec3	glowColor;',
    'uniform float	coeficient;',
    'uniform float	power;',

    'varying vec3	vVertexNormal;',
    'varying vec3	vVertexWorldPosition;',

    'void main(){',
    '	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',
    '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
    '	viewCameraToVertex	= normalize(viewCameraToVertex);',
    '	float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
    '	gl_FragColor		= vec4(glowColor, intensity);',
    '}'
  ].join('\n')

  // create custom material from the shader code above
  //   that is within specially labeled script tags
  const material = new THREE.ShaderMaterial({
    uniforms: {
      coeficient: {
        type: 'f',
        value: 1.0
      },
      power: {
        type: 'f',
        value: 2
      },
      glowColor: {
        type: 'c',
        value: new THREE.Color('pink')
      }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    //blending	: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  })
  return material
}

// from http://planetpixelemporium.com/

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createEarth = function (radius = 0.5, widthSegments = 32, heightSegments = 32) {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)

  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(earth_bg)
  })

  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createEarthWithAtmosphere = function (radius = 0.5, widthSegments = 32, heightSegments = 32) {
  const earth = createEarth(radius, widthSegments, heightSegments)
  earth.receiveShadow = true
  earth.castShadow = true
  const atmosphereMaterial = createAtmosphereMaterial()
  atmosphereMaterial.uniforms.coeficient.value = 0.5
  atmosphereMaterial.uniforms.power.value = 4.0
  atmosphereMaterial.uniforms.glowColor.value.set(0x00b3ff)
  atmosphereMaterial.side = THREE.BackSide
  const geometry = earth.geometry.clone()
  const atmosphere = new THREE.Mesh(geometry, atmosphereMaterial)
  atmosphere.scale.multiplyScalar(1.15)
  const group = new THREE.Group()
  group.add(earth)
  group.add(atmosphere)
  return group
}

export { createEarth, createAtmosphereMaterial, createEarthWithAtmosphere }
