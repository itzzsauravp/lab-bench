# Image Processing: 3 Ways to Handle Heavy Tasks

This project compares how a server survives (or crashes) when processing large 1GB images.

### 1. The Blocking Way 

**How it works:** You run the crop command directly in the request.

* **The Problem:** The entire server "freezes" for everyone until that one image is done. No one else can even load the homepage.
* **Result:** High Latency & Angry Users.

### 2. The Threaded Way

**How it works:** You spawn a new Worker Thread for every request.

* **The Good:** The server stays "awake" and responsive.
* **The Problem:** If 100 people upload a 1GB image at once, the server tries to use 100GB of RAM and crashes the OS.
* **Result:** Out of Memory (OOM) Crash.

### 3. The Queue Way

**How it works:** You put the job in a **Redis Queue (BullMQ)** and return a "Ticket ID" immediately.

* **The Good:** You tell the worker: *"Only process 2 images at a time, no matter how many people ask."*
* **The Win:** The server never crashes, the RAM stays low, and the extra jobs just wait patiently in line.
* **Result:** Rock-solid stability.

## Getting Started

1. **Visit the UI:** Navigate to `http://localhost:8000/crop/images` to access the Handlebars-based upload interface.
2. **Select a Mode:** The application supports three different processing strategies. You can toggle these by changing the `action` attribute in the form located at `/src/views/images/index.hbs`.

### Processing Strategies

| Route | Strategy | Behavior |
| --- | --- | --- |
| `/crop/images/sync` | **Synchronous** | **Blocking.** The main thread is held until the crop completes. The server cannot handle other requests during this time. |
| `/crop/images/worker` | **Worker Threads** | **Parallel.** Each request spawns a new thread. Responsive, but risks crashing the OS under high load (RAM/CPU exhaustion). |
| `/crop/images/queue` | **BullMQ + Redis** | **Managed.** Jobs are offloaded to Redis and processed by a worker pool with strictly controlled concurrency. |

---

## Project Structure

* **Routes:** `src/routes/images.route.ts` — Defines the endpoints for the different strategies.
* **Controllers:** `src/controllers/images.controller.ts` — Contains the logic for triggering the crop tasks.
* **Views:** `src/views/images/index.hbs` — The Handlebars template for the upload and download UI.
* **Worker/Queue:** `src/queues/image.queue.ts` — Implementation of the BullMQ background processing logic.

---

## Usage Note

To test the different modes, modify the form action in `index.hbs`:

```html
<form action="/crop/images/queue" method="POST" enctype="multipart/form-data">
  ...
</form>

```
---
