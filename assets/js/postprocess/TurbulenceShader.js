import {Vector2} from '../lib/three.module.js'
import ShaderMethod from '../method/method.shader.js'

const TurbulenceShader = {
    uniforms: {
        tDiffuse: {value: null},
        time: {value: null},
        resolution: {value: new Vector2(0, 0)}
    },

    vertexShader: `
        varying vec2 vUv;

        void main(){
            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        varying vec2 vUv;

        uniform sampler2D tDiffuse;
        uniform float time;
        uniform vec2 resolution;

        ${ShaderMethod.snoise3D()}
        ${ShaderMethod.turbulence()}

        void main(){
            vec2 st = vUv;
            st.x *= resolution.x / resolution.y;

            vec2 t = vec2(0);
            t += fbm(vec3(st * 10.0, time * 0.0003)) * 0.025;

            vec4 color = texture(tDiffuse, vUv + t);

            gl_FragColor = color;
        }
    `
}

export {TurbulenceShader}