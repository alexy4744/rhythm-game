// import { BoxGeometry, Mesh, MeshPhongMaterial, PointLight, PlaneGeometry, AmbientLight, PCFShadowMap, Vector3, PointLightHelper } from "three";
// import Scene from "../../Scene";

// import FLAGS from "@/constants/flags";

// const wireframe = false;

// class Demo {
//   private cube: Mesh;

//   public constructor(private scene: Scene) {
//     const floor = new Mesh(
//       new BoxGeometry(10, 10, 10, 10),
//       new MeshPhongMaterial({ color: 0xde2e43, wireframe })
//     );
    
//     floor.receiveShadow = true;
    
//     scene.add(floor);
    
//     const cube = new Mesh(
//       new BoxGeometry(),
//       new MeshPhongMaterial({ color: 0x5089db, wireframe })
//     );
    
//     cube.receiveShadow = true;
//     cube.castShadow = true;
    
//     cube.position.set(0, 7, 0);
//     this.cube = cube;
//     scene.add(cube);
    
//     const ambient = new AmbientLight(0xffffff, 0.75);
    
//     scene.add(ambient);
    
//     const light = new PointLight(0xffffff, 1.5, 18);
    
//     light.position.set(-3, 15, -3);
//     light.castShadow = true;
    
//     light.shadow.camera.near = 0.1;
//     light.shadow.camera.far = 25;
    
//     light.shadow.mapSize.width = 1024;
//     light.shadow.mapSize.height = 1024;
    
//     scene.add(light);
    
//     // const lightHelper = new PointLightHelper(light, 1);
    
//     // game.scene.add(lightHelper);
    
//     scene.video.renderer.shadowMap.enabled = true;
//     scene.video.renderer.shadowMap.type = PCFShadowMap;
    
//     scene.video.camera.position.set(0, 15, -10);
//     scene.video.camera.zoom = 2;
//     scene.video.camera.lookAt(new Vector3(0, 3, 0));
//     scene.video.camera.updateProjectionMatrix();
//   }

//   public update() {
//     this.cube.rotation.x += 0.01;
//     this.cube.rotation.y += 0.01;

//     const { audioManager, staff } = this.scene.video.game;

//     if (staff.currentNoteIndex >= staff.notes.length) return;

//     const mp3 = audioManager.entries.get(FLAGS.AUDIO.BEATMAP_MP3);
//     if (!mp3) throw new Error("Beatmap music file not loaded in audio manager!");

//     const currentNotePositionInBeats = staff.currentNote.start / staff.secondsPerBeat;
//     const currentSongPositionInBeats = mp3.currentPosition / staff.secondsPerBeat;

//     if (currentNotePositionInBeats < currentSongPositionInBeats) {
//       console.log(mp3.currentPosition, currentSongPositionInBeats, currentNotePositionInBeats);
//       this.cube.rotation.x += 0.5;
//       this.cube.rotation.y += 0.5;
//       staff.proceed();
//     }
//   }
// }

// export default Demo;
