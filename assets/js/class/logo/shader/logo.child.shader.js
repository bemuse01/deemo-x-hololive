// import ShaderMethod from '../../../method/method.shader.js'
// import LogoChildParam from '../param/logo.child.param.js'

const LogoChildShader = {
    vertex: `
        varying vec2 vUv;

        void main(){
            vUv = uv;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragment: `
        uniform sampler2D uTexture;
        uniform vec2[${LogoChildParam.count}] uRandPosition;
        uniform float[${LogoChildParam.count}] uRadius;
        uniform float uRatio;
        uniform float uBlur;
        
        varying vec2 vUv;

        void main(){
            vec2 st = vUv;

            st -= 0.5;
            st.x *= uRatio;

            vec4 color = texture(uTexture, vUv);
            float a = 0.0;
            int num = 0;

            for(int i = 0; i < ${LogoChildParam.count}; i++){
                if(uRadius[i] == 0.0) continue;

                float radius = uRadius[i] * uRatio;
                float blur = radius * uBlur;
    
                float b = radius - blur;
                float dist = distance(st, uRandPosition[i]);
                float x = (radius - clamp(dist, b, radius)) / blur;
    
                float alpha = mix(0.0, 1.0, x);
                a += alpha;
            }

            color.a *= a / ${LogoChildParam.count}.;

            gl_FragColor = color;
        }
    `
}