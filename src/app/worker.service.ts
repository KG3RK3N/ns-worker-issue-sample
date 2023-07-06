import { Injectable, OnDestroy } from "@angular/core";

@Injectable({ providedIn: "root" })
export class WorkerService implements OnDestroy {
  sampleWorker: Worker = null;

  initSampleWorker(): Worker {
    if (!this.sampleWorker) {
      this.sampleWorker = new Worker("./workers/sample.worker");
    }

    return this.sampleWorker;
  }

  ngOnDestroy() {
    if (this.sampleWorker) {
      this.sampleWorker.terminate();
    }
  }
}
