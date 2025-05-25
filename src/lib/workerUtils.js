// Utility to use the web worker for expensive operations
let worker = null;
let messageId = 0;
const callbacks = new Map();

// Initialize the worker
export function initWorker() {
  if (typeof Worker !== 'undefined' && !worker) {
    worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
    
    worker.addEventListener('message', (event) => {
      const { id, result, error } = event.data;
      const callback = callbacks.get(id);
      
      if (callback) {
        if (error) {
          callback.reject(new Error(error));
        } else {
          callback.resolve(result);
        }
        callbacks.delete(id);
      }
    });
    
    return true;
  }
  return false;
}

// Execute an operation in the worker
export function executeWorkerOperation(operation, data) {  if (!worker && !initWorker()) {
    // Fallback if web workers aren't supported
    return Promise.reject(new Error('Web Workers not supported'));
  }
  
  const id = messageId++;
  
  return new Promise((resolve, reject) => {
    callbacks.set(id, { resolve, reject });
    worker.postMessage({ id, operation, data });
  });
}

// Terminate the worker when no longer needed
export function terminateWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
    callbacks.clear();
  }
}