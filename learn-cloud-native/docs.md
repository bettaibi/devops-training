# Cloud Native Concepts & Fundamentals

## What Is "Cloud Native"?

**Mental model:** Think of cloud native like the difference between owning a car vs. using a ride-sharing service. With your own car (traditional IT), you buy it, maintain it, park it, insure it — whether you drive 5 miles or 500. With ride-sharing (cloud native), you summon exactly what you need, pay per ride, and the fleet scales to demand automatically.

Cloud native is a **design philosophy** for building and running applications that fully exploit the advantages of cloud computing. It's not just "running your app in the cloud" — that's cloud hosting. Cloud native means your application is **designed from the ground up** to be:

- **Elastic**: Scales up and down automatically based on demand
- **Resilient**: Survives failures of individual components without going down
- **Observable**: Exposes metrics, logs, and traces so you can understand what's happening
- **Loosely coupled**: Components can be developed, deployed, and scaled independently
- **Automated**: Deployments, scaling, and recovery happen without human intervention

### Cloud Native ≠ Cloud Hosted

| Aspect | Cloud Hosted | Cloud Native |
|--------|-------------|--------------|
| Architecture | Monolith moved to a VM | Microservices, containers |
| Scaling | Manual or scheduled | Automatic, per-component |
| Deployment | Big releases, downtime | Continuous, zero-downtime |
| Failure handling | Hope it doesn't happen | Design for failure |
| State | Stored locally on servers | Externalized to managed services |

A legacy Java monolith running on an EC2 instance is **cloud hosted**. A set of containerized microservices auto-scaling on Kubernetes with externalized state in a managed database — that's **cloud native**.

---

## The Cloud Computing Stack: IaaS vs. PaaS vs. SaaS

This is the single most important mental model for understanding cloud services. Everything else maps onto this spectrum.

### The Pizza Analogy

Imagine you want pizza. You have four options:

```
┌─────────────────────────────────────────────────────────────────────┐
│                      THE PIZZA MODEL OF CLOUD                       │
├──────────────┬──────────────┬──────────────┬───────────────────────┤
│  On-Premise  │    IaaS      │    PaaS      │    SaaS               │
│  (Homemade)  │  (Take & Bake)│ (Delivery)  │  (Dine Out)           │
├──────────────┼──────────────┼──────────────┼───────────────────────┤
│ You make     │ You get raw  │ Pizza is made│ You sit down,         │
│ everything:  │ dough+cheese │ & delivered. │ eat pizza.            │
│ dough, sauce │ + oven.      │ You eat at   │ Someone else          │
│ cheese, oven │ You assemble │ your table.  │ handles everything.   │
│ table, plate │ & bake it.   │              │                       │
└──────────────┴──────────────┴──────────────┴───────────────────────┘
```

### What Each Layer Means

```
RESPONSIBILITY STACK
                    On-Prem    IaaS     PaaS     SaaS
                   ────────   ──────   ──────   ──────
  Applications     │ YOU  │   │ YOU │   │ YOU │   │    │
  Data             │ YOU  │   │ YOU │   │ YOU │   │    │
  Runtime          │ YOU  │   │ YOU │   │    ░│   │    │
  Middleware       │ YOU  │   │ YOU │   │    ░│   │ C  │
  OS               │ YOU  │   │ YOU │   │    ░│   │ L  │
  Virtualization   │ YOU  │   │   ░ │   │    ░│   │ O  │
  Servers          │ YOU  │   │   ░ │   │    ░│   │ U  │
  Storage          │ YOU  │   │   ░ │   │    ░│   │ D  │
  Networking       │ YOU  │   │   ░ │   │    ░│   │    │
                   ────────   ──────   ──────   ──────
                                ░ = Cloud provider manages
```

### IaaS — Infrastructure as a Service

**What it is:** The cloud provider gives you raw computing resources — virtual machines, storage, and networks. You manage everything from the OS upward.

**Mental model:** Renting an empty apartment. The building (hardware) is maintained for you, but you bring your own furniture, appliances, and décor. You decide what OS to install, what software to run, how to configure networking.

**You manage:** OS, runtime, middleware, application, data, security patches, scaling
**Provider manages:** Physical servers, networking hardware, storage hardware, virtualization

**Examples:**
| AWS | GCP | Azure |
|-----|-----|-------|
| EC2 (VMs) | Compute Engine | Virtual Machines |
| EBS (block storage) | Persistent Disk | Managed Disks |
| VPC (networking) | VPC | Virtual Network |

**When to use:** You need full control over the OS and runtime environment. You have specialized software requirements or compliance needs that demand OS-level access. Your team has the ops expertise to manage servers.

**Real-world scenario:** A gaming company running custom game servers that need specific kernel configurations and low-level network tuning.

---

### PaaS — Platform as a Service

**What it is:** The cloud provider manages the infrastructure AND the platform (runtime, middleware, OS). You just deploy your code.

**Mental model:** Renting a fully furnished apartment. Show up with your clothes (application code) and start living (running). You don't worry about buying furniture (setting up servers) or fixing plumbing (patching the OS).

**You manage:** Application code, data
**Provider manages:** Everything else — OS, runtime, scaling, patching, networking

**Examples:**
| AWS | GCP | Azure |
|-----|-----|-------|
| Elastic Beanstalk | App Engine | App Service |
| Lambda (serverless) | Cloud Functions | Azure Functions |
| Fargate (serverless containers) | Cloud Run | Container Apps |

**When to use:** You want to focus purely on business logic. You don't want to manage servers, OS patches, or scaling infrastructure. You're building web apps, APIs, or event-driven workloads.

**Real-world scenario:** A startup building a REST API. They deploy their Node.js code to App Engine and never think about servers, load balancers, or auto-scaling configuration.

---

### SaaS — Software as a Service

**What it is:** The cloud provider delivers a fully functional application. You just use it through a browser or API.

**Mental model:** Eating at a restaurant. You don't cook, you don't set the table, you don't even wash dishes. You show up, consume, and leave.

**You manage:** Your data, your user configurations
**Provider manages:** Everything — the entire application, infrastructure, updates, availability

**Examples:**
| Category | Services |
|----------|----------|
| Email | Gmail, Outlook 365 |
| CRM | Salesforce, HubSpot |
| Collaboration | Slack, Microsoft Teams |
| Storage | Google Drive, Dropbox |
| Monitoring | Datadog, New Relic |

**When to use:** You need standard business functionality without building it yourself. The software solves a common, well-understood problem.

---

### Beyond the Big Three: Other "aaS" Models

| Model | Full Name | What It Provides | Example |
|-------|-----------|-------------------|---------|
| **FaaS** | Function as a Service | Run individual functions, pay per invocation | AWS Lambda, Cloud Functions |
| **CaaS** | Container as a Service | Run containers without managing the cluster | AWS Fargate, Cloud Run |
| **DBaaS** | Database as a Service | Managed databases | RDS, Cloud SQL, Cosmos DB |
| **BaaS** | Backend as a Service | Pre-built backend features (auth, storage, APIs) | Firebase, Supabase |

FaaS is a subset of PaaS. CaaS sits between IaaS and PaaS. These aren't separate categories — they're refinements along the same spectrum.

---

## The Big Three Cloud Providers: AWS vs. GCP vs. Azure

### The Key Difference Is Not Technical — It's Strategic

All three offer virtually identical core services. The real differences are:

1. **Market position and ecosystem**
2. **Pricing models and billing**
3. **Developer experience and philosophy**
4. **Enterprise integration story**

### At a Glance

```
┌────────────────┬──────────────────┬──────────────────┬──────────────────┐
│                │      AWS         │      GCP          │     Azure        │
├────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Market Share   │ ~31% (#1)        │ ~12% (#3)        │ ~25% (#2)        │
│ Founded        │ 2006             │ 2008             │ 2010             │
│ Strength       │ Breadth of       │ Data/AI/ML,      │ Enterprise,      │
│                │ services, mature │ Kubernetes (GKE),│ Hybrid cloud,    │
│                │ ecosystem        │ developer UX     │ Microsoft stack  │
│ Philosophy     │ "Build anything" │ "Build smart"    │ "Build for       │
│                │ — max options    │ — opinionated,   │ enterprise" —    │
│                │                  │ clean            │ integration      │
│ Best For       │ Startups to      │ Data-heavy,      │ Microsoft shops, │
│                │ enterprise,      │ ML/AI, K8s-first │ regulated        │
│                │ anything goes    │ workloads        │ industries       │
│ Pain Point     │ Complexity,      │ Smaller ecosystem│ Naming chaos,    │
│                │ naming chaos     │ fewer services   │ portal UX        │
└────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

### Service-by-Service Comparison

#### Compute

| What You Need | AWS | GCP | Azure |
|---------------|-----|-----|-------|
| Virtual machines | EC2 | Compute Engine | Virtual Machines |
| Auto-scaling VM groups | Auto Scaling Groups | Managed Instance Groups | VM Scale Sets |
| Serverless functions | Lambda | Cloud Functions | Azure Functions |
| Serverless containers | Fargate | Cloud Run | Container Apps |
| Kubernetes (managed) | EKS | GKE | AKS |
| Bare metal | Bare Metal | Sole-tenant Nodes | Dedicated Host |

**Key difference:** GKE is widely considered the best managed Kubernetes service — Google invented Kubernetes. EKS is more flexible but more complex to configure. AKS integrates tightly with Azure Active Directory.

#### Storage

| What You Need | AWS | GCP | Azure |
|---------------|-----|-----|-------|
| Object storage | S3 | Cloud Storage | Blob Storage |
| Block storage | EBS | Persistent Disk | Managed Disks |
| File storage (NFS) | EFS | Filestore | Azure Files |
| Archive/cold storage | S3 Glacier | Archive Storage | Archive Storage |

**Key difference:** S3 is the industry standard — most tools integrate with S3 natively. GCP Cloud Storage is simpler to configure. Azure Blob Storage uses a different API paradigm (containers + blobs vs. buckets + objects).

#### Databases

| What You Need | AWS | GCP | Azure |
|---------------|-----|-----|-------|
| Relational (managed) | RDS, Aurora | Cloud SQL, AlloyDB | Azure SQL, Flexible Server |
| NoSQL document | DynamoDB | Firestore | Cosmos DB |
| In-memory cache | ElastiCache | Memorystore | Azure Cache for Redis |
| Data warehouse | Redshift | BigQuery | Synapse Analytics |

**Key difference:** BigQuery is GCP's crown jewel — serverless, massively scalable SQL analytics with a pay-per-query model that's hard to beat. DynamoDB leads for key-value workloads. Cosmos DB offers multi-model (document, graph, key-value, column) under one service.

#### Networking

| What You Need | AWS | GCP | Azure |
|---------------|-----|-----|-------|
| Virtual network | VPC | VPC | VNet |
| Load balancer | ALB/NLB/CLB | Cloud Load Balancing | Azure Load Balancer |
| DNS | Route 53 | Cloud DNS | Azure DNS |
| CDN | CloudFront | Cloud CDN | Azure CDN / Front Door |
| VPN | Site-to-Site VPN | Cloud VPN | VPN Gateway |

**Key difference:** GCP's network is built on Google's global backbone — network performance between regions is exceptionally good. AWS has the most PoPs (Points of Presence) for edge delivery. Azure's network integrates with ExpressRoute for enterprise hybrid setups.

#### AI/ML

| What You Need | AWS | GCP | Azure |
|---------------|-----|-----|-------|
| ML platform | SageMaker | Vertex AI | Azure ML |
| Pre-built AI APIs | Rekognition, Comprehend | Vision AI, Natural Language | Cognitive Services |
| LLM / GenAI | Bedrock | Vertex AI + Gemini | Azure OpenAI Service |
| Data labeling | Ground Truth | Vertex AI Data Labeling | Azure ML Data Labeling |

**Key difference:** GCP leads in AI/ML tooling — TPUs, Gemini, and deep TensorFlow integration. Azure has exclusive access to OpenAI models (GPT-4, etc.) through Azure OpenAI Service. AWS Bedrock offers multi-model access (Claude, Llama, Titan) as a marketplace approach.

#### Identity & Security

| What You Need | AWS | GCP | Azure |
|---------------|-----|-----|-------|
| Identity management | IAM | Cloud IAM | Azure AD + RBAC |
| Secrets management | Secrets Manager | Secret Manager | Key Vault |
| Encryption (KMS) | KMS | Cloud KMS | Key Vault |
| DDoS protection | Shield | Cloud Armor | DDoS Protection |

**Key difference:** Azure Active Directory (now Entra ID) is the most mature enterprise identity platform. AWS IAM is the most granular (and most complex). GCP IAM is the simplest with organization-level policies.

---

### When to Choose Which

```
Choose AWS when:
├── You need the widest selection of services
├── You want the largest community and ecosystem of third-party tools
├── You're a startup using the AWS Free Tier / Activate program
└── You need services that only AWS offers (e.g., specific compliance certs)

Choose GCP when:
├── You're heavy on data analytics (BigQuery is unmatched)
├── You're running Kubernetes-native workloads (GKE is the gold standard)
├── You want the best AI/ML platform and access to Google's AI stack
├── You prefer clean UX and opinionated defaults over endless configuration
└── You want competitive sustained-use pricing without commitments

Choose Azure when:
├── Your organization already uses Microsoft (Office 365, Active Directory)
├── You need hybrid cloud (Azure Arc, Azure Stack)
├── You're in a regulated industry that requires specific Microsoft compliance
├── You need Azure OpenAI Service for GPT-4 integration
└── You want deep integration with .NET, Windows Server, SQL Server
```

---

## Core Cloud Native Technologies

### Containers

**Mental model:** A container is like a shipping container. Before shipping containers existed, loading a ship was chaos — different sized boxes, fragile items, liquids all mixed together. Shipping containers standardized everything: pack your goods into a standard container, and it works on any ship, any truck, any crane.

Software containers do the same thing. They package your application with **everything it needs** (code, runtime, libraries, config) into a standardized unit that runs the same everywhere — your laptop, a test server, production.

```
┌─────────────────────────────────┐
│          VIRTUAL MACHINE        │
│  ┌───────────┐ ┌───────────┐   │
│  │   App A   │ │   App B   │   │
│  │  Libs/Bins│ │  Libs/Bins│   │
│  │  Guest OS │ │  Guest OS │   │     ← Each VM has a FULL OS (GB)
│  └───────────┘ └───────────┘   │
│       Hypervisor               │
│       Host OS                  │
│       Hardware                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│          CONTAINERS             │
│  ┌───────┐ ┌───────┐ ┌───────┐ │
│  │ App A │ │ App B │ │ App C │ │
│  │ Libs  │ │ Libs  │ │ Libs  │ │     ← Containers share the host OS
│  └───────┘ └───────┘ └───────┘ │       kernel (MB, not GB)
│       Container Runtime        │
│       Host OS                  │
│       Hardware                 │
└─────────────────────────────────┘
```

**Key insight:** Containers are NOT lightweight VMs. VMs virtualize hardware. Containers virtualize the OS. A container is just an isolated process with its own filesystem view — it shares the host kernel.

**Docker** is the most common container runtime. A `Dockerfile` describes how to build a container image. A container image is a template. A running container is an instance of that image.

---

### Container Orchestration (Kubernetes)

**Mental model:** If containers are shipping containers, Kubernetes is the **port authority**. It decides which containers go on which ships (servers), monitors them, replaces broken ones, and ensures the right number are running at all times.

**What Kubernetes does:**
- **Scheduling**: Places containers on nodes with available resources
- **Self-healing**: Restarts failed containers, replaces unresponsive nodes
- **Scaling**: Adds/removes container instances based on load
- **Service discovery**: Containers find each other by name, not IP
- **Rolling updates**: Deploys new versions with zero downtime
- **Config management**: Manages secrets and configuration separately from code

```
KUBERNETES ARCHITECTURE (simplified)

┌──────────────────────────────────────────────────────┐
│                    CONTROL PLANE                      │
│  ┌─────────────┐ ┌──────────┐ ┌───────────────────┐ │
│  │ API Server  │ │ Scheduler│ │ Controller Manager│ │
│  └─────────────┘ └──────────┘ └───────────────────┘ │
│  ┌─────────────────────────────────────────────────┐ │
│  │                    etcd                         │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
          │                    │
┌─────────┴──────────┐ ┌──────┴────────────┐
│      NODE 1        │ │      NODE 2        │
│ ┌────┐ ┌────┐      │ │ ┌────┐ ┌────┐     │
│ │Pod │ │Pod │      │ │ │Pod │ │Pod │     │
│ │ A  │ │ B  │      │ │ │ A  │ │ C  │     │
│ └────┘ └────┘      │ │ └────┘ └────┘     │
│    kubelet         │ │    kubelet         │
│    kube-proxy      │ │    kube-proxy      │
└────────────────────┘ └────────────────────┘
```

**Pod** = The smallest deployable unit in Kubernetes. Usually one container, sometimes tightly coupled containers. Not "a VM" — a pod is ephemeral and can be destroyed and recreated at any time.

---

### Serverless

**Mental model:** Serverless is like electricity. You don't own a power plant. You plug in, use what you need, and pay for what you consumed. The utility company handles generation, transmission, and maintenance.

**What "serverless" actually means:** Servers still exist — you just don't manage or even see them. The cloud provider handles all infrastructure. You provide code; they handle everything else.

**Two forms of serverless:**
1. **FaaS (Functions):** Single-purpose functions triggered by events (HTTP request, file upload, queue message). Examples: Lambda, Cloud Functions, Azure Functions.
2. **Serverless Containers:** Full applications packaged as containers but deployed without managing servers. Examples: Cloud Run, Fargate, Container Apps.

**Key characteristics:**
- **Pay-per-use**: Charged per invocation/execution time, not per hour
- **Scale to zero**: No traffic = no running instances = no cost
- **Auto-scale**: Handles traffic spikes automatically (within limits)
- **Ephemeral**: Each invocation may run on a different machine
- **Stateless**: Functions don't retain state between invocations — use external storage

**Trade-offs:**
- Cold starts: First invocation after idle period is slower (container needs to spin up)
- Execution limits: Maximum duration (Lambda: 15 min), memory, payload size
- Vendor lock-in: Your function code is often tightly coupled to the provider's event system
- Debugging: Harder to reproduce production issues locally

---

### Microservices vs. Monolith

```
MONOLITH                          MICROSERVICES

┌─────────────────────┐           ┌──────┐ ┌──────┐ ┌──────┐
│                     │           │ Auth │ │Orders│ │Notify│
│    All features     │           │  ──  │ │  ──  │ │  ──  │
│    in one unit      │    →      │ Own  │ │ Own  │ │ Own  │
│                     │           │ DB   │ │ DB   │ │ DB   │
│   Single deploy     │           └──┬───┘ └──┬───┘ └──┬───┘
│   Single database   │              │        │        │
└─────────────────────┘           ───┴────────┴────────┴───
                                       API Gateway / Mesh
```

**Monolith is not bad.** It's simpler to develop, test, deploy, and debug. For small teams and early-stage products, a monolith is often the right choice.

**Microservices solve scaling problems** — both technical (scale individual components) and organizational (independent teams own independent services). But they introduce distributed systems complexity: network failures, data consistency challenges, operational overhead.

**The progression most teams follow:**
1. Start with a monolith
2. Identify bottlenecks and high-change areas
3. Extract those into services
4. End up with a mix (sometimes called a "modular monolith" or "macro-services")

---

## Cloud Native Patterns and Principles

### The Twelve-Factor App (Condensed)

Originally published by Heroku, these principles define how cloud native apps should be built:

| Factor | Principle | Why It Matters |
|--------|-----------|----------------|
| **Codebase** | One codebase, many deploys | Same code for dev, staging, production |
| **Dependencies** | Explicitly declare and isolate | No "it works on my machine" |
| **Config** | Store config in environment | Never hardcode secrets or URLs |
| **Backing services** | Treat as attached resources | Swap databases by changing a URL, not code |
| **Build, release, run** | Strict separation of stages | Reproducible deployments |
| **Processes** | Execute as stateless processes | Any instance can handle any request |
| **Port binding** | Export services via port binding | Self-contained, no external web server needed |
| **Concurrency** | Scale out via the process model | Add more instances, not bigger machines |
| **Disposability** | Fast startup, graceful shutdown | Instances can be created/destroyed freely |
| **Dev/prod parity** | Keep environments similar | Reduces "works in dev, breaks in prod" |
| **Logs** | Treat as event streams | Don't write to files — stream to stdout |
| **Admin processes** | Run as one-off processes | Migrations, scripts as part of the same codebase |

---

### Infrastructure as Code (IaC)

**Mental model:** IaC is like a recipe. Instead of manually cooking (clicking through cloud consoles), you write down every step. Anyone can follow the recipe and get the same result every time.

**What it means:** Define your entire infrastructure (servers, databases, networks, permissions) in code files that are version-controlled, reviewed, tested, and applied automatically.

**Key tools:**
| Tool | Type | Provider |
|------|------|----------|
| Terraform / OpenTofu | Declarative, multi-cloud | HashiCorp / Open Source |
| CloudFormation | Declarative, AWS only | AWS |
| Pulumi | Imperative (real code), multi-cloud | Pulumi |
| Bicep | Declarative, Azure only | Microsoft |
| CDK | Imperative → synthesizes to CloudFormation/Terraform | AWS / Community |

**Declarative vs. Imperative:**
- **Declarative** (Terraform): "I want 3 servers with 4GB RAM" — the tool figures out how
- **Imperative** (Pulumi, scripts): "Create server 1, then server 2, then server 3" — you specify the steps

---

### CI/CD in Cloud Native

**Continuous Integration (CI):** Every code change is automatically built, tested, and validated.
**Continuous Delivery (CD):** Every validated change is automatically deployable to production.
**Continuous Deployment:** Every validated change IS automatically deployed to production.

```
Developer          CI Pipeline              CD Pipeline
   │                    │                        │
   │── git push ──────→ │                        │
   │                    │── build ──────────→     │
   │                    │── unit tests ────→      │
   │                    │── lint/scan ─────→      │
   │                    │── integration ───→      │
   │                    │── build image ───→      │
   │                    │                    ┌────┴────┐
   │                    │                    │ Deploy  │
   │                    │                    │ Staging │
   │                    │                    └────┬────┘
   │                    │                    ┌────┴────┐
   │                    │                    │ Deploy  │
   │                    │                    │  Prod   │
   │                    │                    └─────────┘
```

---

### Observability: The Three Pillars

When something breaks in a distributed system, you can't just SSH into a server and read a log file. You need observability.

| Pillar | What It Captures | Example Tools |
|--------|-----------------|---------------|
| **Logs** | Discrete events — what happened | ELK Stack, CloudWatch Logs, Cloud Logging |
| **Metrics** | Numerical measurements over time — how much/how fast | Prometheus, CloudWatch Metrics, Cloud Monitoring |
| **Traces** | Request flow across services — where time was spent | Jaeger, Zipkin, X-Ray, Cloud Trace |

**Mental model:** Investigating a performance issue is like being a detective.
- **Logs** = witness statements ("at 2:03pm, the database said 'connection refused'")
- **Metrics** = surveillance footage ("CPU spiked to 95% starting at 2:00pm")
- **Traces** = following a suspect through a city ("this request spent 2ms in auth, then 3000ms in payment service")

---

## Common Confusions Clarified

### "Cloud" vs. "Cloud Native" vs. "Cloud Enabled"

| Term | Meaning |
|------|---------|
| **Cloud** | Someone else's computer (datacenter) accessible over the internet |
| **Cloud Enabled** | Existing app moved to run on cloud infrastructure (lift and shift) |
| **Cloud Native** | App designed from scratch to leverage cloud capabilities (elasticity, resilience, automation) |

### Containers vs. Serverless — When to Use Which

| Factor | Containers | Serverless |
|--------|-----------|------------|
| Startup time | Fast (if running) | Cold start penalty |
| Cost at idle | Paying for running containers | Zero cost at zero traffic |
| Cost at scale | More predictable | Can get expensive at high RPS |
| Control | Full control over runtime | Limited runtime options |
| Long-running processes | Yes | Time-limited |
| Use case | APIs, microservices, background workers | Event-driven, sporadic traffic, webhooks |

### Regions vs. Zones vs. Edge

```
┌───────────────────────────────────────────────────┐
│                    REGION                          │
│        (e.g., us-east-1 / us-east1)               │
│                                                   │
│   ┌───────────┐  ┌───────────┐  ┌───────────┐   │
│   │  Zone A   │  │  Zone B   │  │  Zone C   │   │
│   │ (us-east  │  │ (us-east  │  │ (us-east  │   │
│   │  -1a)     │  │  -1b)     │  │  -1c)     │   │
│   │           │  │           │  │           │   │
│   │ Separate  │  │ Separate  │  │ Separate  │   │
│   │ power,    │  │ power,    │  │ power,    │   │
│   │ cooling,  │  │ cooling,  │  │ cooling,  │   │
│   │ networking│  │ networking│  │ networking│   │
│   └───────────┘  └───────────┘  └───────────┘   │
└───────────────────────────────────────────────────┘

EDGE = CDN PoPs (200+ locations worldwide)
       Cache content close to users
       Not for compute (usually), just delivery
```

- **Region**: Geographic area (e.g., Northern Virginia, London, Tokyo). Choose based on latency to users and data residency requirements.
- **Zone**: Isolated datacenter within a region. Deploy across multiple zones for high availability.
- **Edge**: CDN locations at the "edge" of the network, close to end users. Primarily for caching static content and reducing latency.

### Managed vs. Self-Managed

| Aspect | Self-Managed | Managed Service |
|--------|-------------|-----------------|
| Example | PostgreSQL on EC2 | RDS PostgreSQL |
| You handle | Installation, patching, backups, scaling, HA, monitoring | Application-level config |
| Cost | Lower compute cost, higher ops cost | Higher service cost, near-zero ops cost |
| When to use | Need exotic config, cost-sensitive at scale | Almost always — unless you have a specific reason not to |

**Rule of thumb:** Use managed services unless you have a compelling reason not to. The operational burden of running databases, caches, and message queues yourself is almost always underestimated.

---

## Pricing Models Across Providers

Understanding cloud billing prevents surprise invoices.

| Model | How It Works | Example |
|-------|-------------|---------|
| **On-demand** | Pay per hour/second, no commitment | EC2, Compute Engine |
| **Reserved/Committed** | 1-3 year commitment for 30-70% discount | Reserved Instances, Committed Use |
| **Spot/Preemptible** | Use spare capacity at 60-90% discount, can be terminated anytime | Spot Instances, Spot VMs |
| **Pay-per-use** | Pay per request, per GB, per invocation | Lambda, S3, BigQuery |
| **Free tier** | Limited free usage for 12 months or always | All three providers offer this |

**GCP uniqueness:** Sustained-use discounts are automatic — if you run a VM for more than 25% of the month, you get a discount without any commitment.

**AWS uniqueness:** Savings Plans are flexible commitments — commit to a $ amount per hour, use it across instance families and regions.

**Azure uniqueness:** Azure Hybrid Benefit lets you reuse existing Windows Server and SQL Server licenses for significant discounts.

---

## Summary Decision Framework

```
START HERE
    │
    ▼
Do you need full OS control?
    │
    ├── YES → IaaS (EC2 / Compute Engine / Azure VM)
    │
    └── NO
         │
         ▼
    Is your traffic sporadic/event-driven?
         │
         ├── YES → Serverless (Lambda / Cloud Functions / Azure Functions)
         │
         └── NO
              │
              ▼
         Do you want to manage containers/orchestration?
              │
              ├── YES → CaaS/K8s (EKS / GKE / AKS)
              │
              └── NO → PaaS (Beanstalk / App Engine / App Service)
                        or Serverless Containers (Cloud Run / Fargate)
```

```
Which cloud provider?
    │
    ├── Already a Microsoft shop? → Azure
    │
    ├── Need widest service catalog + largest community? → AWS
    │
    ├── Data/AI-heavy workloads + want best K8s? → GCP
    │
    └── No strong preference? → Any of them.
        The concepts transfer. Pick one, learn deeply.
        Multi-cloud comes later (if ever).
```
