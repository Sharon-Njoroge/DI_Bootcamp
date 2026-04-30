// 1. Define the Video class
class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  // 2. Create the watch() method
  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
  }
}

// 3. Instantiate a new Video instance and call the method
const video1 = new Video("Coding Basics", "Alice", 180);
video1.watch();

// 4. Instantiate a second Video instance
const video2 = new Video("JavaScript Tips", "Bob", 240);
video2.watch();