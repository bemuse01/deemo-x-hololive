import {
	LinearFilter,
	MeshBasicMaterial,
	NearestFilter,
	RGBAFormat,
	ShaderMaterial,
	UniformsUtils,
	WebGLRenderTarget
} from '../lib/three.module.js';
import { Pass, FullScreenQuad } from './Pass.js';
import { AfterimageShader } from './AfterimageShader.js';

class AfterimagePass extends Pass {

	constructor( damp = 0.96 ) {

		super();

		if ( AfterimageShader === undefined ) console.error( 'THREE.AfterimagePass relies on AfterimageShader' );

		this.shader = AfterimageShader;

		this.uniforms = UniformsUtils.clone( this.shader.uniforms );

		this.uniforms[ 'damp' ].value = damp;

		this.textureComp = new WebGLRenderTarget( window.innerWidth, window.innerHeight, {

			minFilter: LinearFilter,
			magFilter: NearestFilter,
			format: RGBAFormat

		} );

		this.textureOld = new WebGLRenderTarget( window.innerWidth, window.innerHeight, {

			minFilter: LinearFilter,
			magFilter: NearestFilter,
			format: RGBAFormat

		} );

		this.shaderMaterial = new ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: this.shader.vertexShader,
			fragmentShader: this.shader.fragmentShader,
			// transparent: true

		} );

		this.compFsQuad = new FullScreenQuad( this.shaderMaterial );

		const material = new MeshBasicMaterial({transparent: true});
		this.copyFsQuad = new FullScreenQuad( material );

	}

	dispose(){
		this.compFsQuad.dispose()
		this.compFsQuad.material.dispose()

		this.copyFsQuad.dispose()
		this.copyFsQuad.material.dispose()

		this.textureComp.dispose()
		this.textureOld.dispose()
	}

	render( renderer, writeBuffer, readBuffer/*, deltaTime, maskActive*/ ) {

		this.uniforms[ 'tOld' ].value = this.textureOld.texture;
		this.uniforms[ 'tNew' ].value = readBuffer.texture;

		renderer.setRenderTarget( this.textureComp );
		this.compFsQuad.render( renderer );

		this.copyFsQuad.material.map = this.textureComp.texture;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.copyFsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );

			if ( this.clear ) renderer.clear();

			this.copyFsQuad.render( renderer );

		}

		// Swap buffers.
		const temp = this.textureOld;
		this.textureOld = this.textureComp;
		this.textureComp = temp;
		// Now textureOld contains the latest image, ready for the next frame.

	}

	setSize( width, height ) {

		this.textureComp.setSize( width, height );
		this.textureOld.setSize( width, height );

	}

}

export { AfterimagePass };
