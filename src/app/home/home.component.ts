import { Component, OnInit } from "@angular/core";
import { WorkerService } from "../worker.service";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  constructor(private workerService: WorkerService) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  startWorker() {
    const worker = this.workerService.initSampleWorker();
    worker.postMessage({
      src: "blah",
      mode: "scale",
      options: {
        whatever: true,
      },
    });

    // handle incoming messages from the worker
    worker.onmessage = function (message) {
      if (message.data.success) {
        // the src received from the worker
        const src = message.data.src;
        console.log("FROM WORKER:", src);

        // terminate worker or send another message...
        worker.terminate();
      } else {
        console.log("FROM WORKER:", message.data);
        // handle unsuccessful task
      }
    };

    // handle worker errors
    worker.onerror = function (err) {
      console.log(
        `An unhandled error occurred in worker: ${err.filename}, line: ${err.lineno} :`,
        err.message
      );
    };
  }
}
