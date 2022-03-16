import CircularBuffer, {
  BufferFullError,
  BufferEmptyError,
} from './circular-buffer';

describe('CircularBuffer', () => {
  test('reading empty buffer should fail', () => {
    const buffer = new CircularBuffer(1);
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test('can read an item just written', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    expect(buffer.read()).toBe('1');
  });

  test('simple writing on full buffer should fail', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    expect(() => buffer.write(2)).toThrow(BufferFullError);
  })

  test('force writing on full buffer overwrites oldest element', () => {
    const buffer = new CircularBuffer(2);
    buffer.write('1');
    buffer.write('2');
    buffer.forceWrite('3');
    expect(buffer.read()).toBe('2');
    expect(buffer.read()).toBe('3');
  })

  test('readIndex will not change on writeIndex change', () => {
    const buffer = new CircularBuffer(2);
    buffer.write('1');
    buffer.write('2');
    expect(buffer.read()).toBe('1');    
  })  

  test('reading order respects writing order', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('1');
    buffer.write('2');
    buffer.write('3');
    expect(buffer.read()).toBe('1');
    expect(buffer.read()).toBe('2');
    expect(buffer.read()).toBe('3');
  })  
  
  test('reading order respects writing order', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    buffer.clear();
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  })    
});
