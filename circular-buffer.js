//
// This is only a SKELETON file for the 'Circular Buffer' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class CircularBuffer {
  constructor(bufferSize) {
    this.buffer = Array(bufferSize)
    this.bufferSize = bufferSize
    this.writeIndex = 0
    this.readIndex = 0    
  }
  write(element) {    
    if(this.buffer[this.writeIndex]) throw new BufferFullError()
    this.buffer[this.writeIndex] = element
    this.writeIndex = (this.writeIndex + 1) % this.bufferSize
  }
  read() {
    if(this.buffer.every(element => element === null)) throw new BufferEmptyError()
    const element = this.buffer[this.readIndex]
    this.buffer[this.readIndex] = null
    this.readIndex = (this.readIndex + 1) % this.bufferSize
    return element
  }
  forceWrite(element) {
    if(!element) return
    if(this.buffer[this.writeIndex]) {
      this.buffer[this.writeIndex % this.bufferSize] = element
      this.writeIndex = (this.writeIndex + 1) % this.bufferSize
      this.readIndex = (this.readIndex + 1) % this.bufferSize
    } else {
      this.buffer[this.writeIndex % this.bufferSize] = element
      this.writeIndex = (this.writeIndex + 1) % this.bufferSize
    }
  }
  clear() {
    this.writeIndex = 0
    this.readIndex = 0
    this.buffer = Array(this.bufferSize)
  }
}
export default CircularBuffer;

export class BufferFullError extends Error {
  constructor() {
    super()
  }
}
export class BufferEmptyError extends Error {
  constructor() {
    super()
  }
}