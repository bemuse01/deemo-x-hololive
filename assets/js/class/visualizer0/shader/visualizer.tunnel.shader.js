export default {
    vertex: `
        attribute float aOpacity;

        varying vec2 vUv;
        varying float vOpacity;

        void main(){
            vUv = uv;
            vOpacity = aOpacity;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragment: `
        varying vec2 vUv;
        varying float vOpacity;

        uniform vec3 uColor;
        uniform float uOpacity;

        void main(){
            gl_FragColor = vec4(uColor, vOpacity * uOpacity);
        }
    `
}