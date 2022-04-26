export default {
    vertex: `
        attribute float aPointSize;

        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aPointSize;
        }
    `,
    fragment: `
        uniform vec3 uColor;

        void main(){
            float f = length(gl_PointCoord - vec2(0.5, 0.5));
            
            if(f > 0.5){
                discard;
            }

            gl_FragColor = vec4(uColor + 0.125, 1.0);
        }
    `
}