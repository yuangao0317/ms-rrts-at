# ms-rrts-at  
## About  
Containerized Microservices Application.  

### (In Development)   
| Service | Status |
| :--- | :---: |
| Client - Auth  | Done |
| Gateway Service - Auth  | Done |
| Notification Service - Auth  | Done |
| Auth Service - Auth  | Done |
| ElasticSearch(local) - Kibana  | Done |
| ElasticSearch(local) - Metricbeat  | Done |
| ElasticSearch(local) - Heartbeat  | Done |
| ElasticSearch(local) - APM  | Done |
| Kubernetes Deployment - Minikube  | Implementing |
| Jenkins CI/CD(local)  | Implementing |
| Finish landing page  |  |
| Other - Microservices(chat service?)  |  |
| Other - Client Features(chat feature?)  |  |
| Kubernetes Deployment - AWS EKS Cluster  |  |  
| Jenkins on AWS  |  |  
| Prometheus/Grafana  |  |  
 
### Tech Stack  
React, NodeJS, Typescript, Kubernetes/Docker, Rabbitmq, Redis, MySQL, PostgreSQL, MongoDB, SocketIO, Minikube, AWS EKS, Tailwind, Express, RTK Query, Elastic Stack, Jenkins, Prometheus/Grafana, JWT Auth, OTP Auth, API Gateway, and more!  

### Architecture  

### API Gateway  
<img src="https://github.com/yuangao0317/ms-rrts-at/assets/12887619/a9a5289b-d7a1-49ea-8e82-94f2505af70e" width="560"/>  

### Authorization Service  
<img src="https://github.com/yuangao0317/ms-rrts-at/assets/12887619/05cc7f33-0600-4fbb-83cb-00fd26d34b1e" width="900"/>  

### K8s/Minikube  
![image](https://github.com/yuangao0317/ms-rrts-at/assets/12887619/1ce9bca7-e59a-4974-a95f-a8c7fab51992)  
Deployed microservices' images for kubernetes  
![image](https://github.com/yuangao0317/ms-rrts-at/assets/12887619/83c4b12c-4b00-44b6-80b7-b8b8b751534d)  
![image](https://github.com/yuangao0317/ms-rrts-at/assets/12887619/a52ac51f-7fe6-4691-a7d1-888c14901432)  

### Monitoring  
##### Metricbeat - Infrastructure  
![image](https://github.com/yuangao0317/ms-rrts-at/assets/12887619/f70de990-a229-4bb6-a750-162d71a8fb47)  
![metricbeat](https://github.com/yuangao0317/ms-rrts-at/assets/12887619/1705a999-1b7a-4eec-8a37-1e7fe66c6f77)  

##### Heartbeat - HTTP Health Endpoint
![image](https://github.com/yuangao0317/ms-rrts-at/assets/12887619/499fc4ab-5364-4e05-83b3-ea080ff6eafe)  

##### APM - HTTP Transaction Tracing  
![apm](https://github.com/yuangao0317/ms-rrts-at/assets/12887619/ccedf231-fdf6-43aa-a46a-05d759793505)  

### How to setup project locally  
\ms-rrts-at> docker compose -f docker-compose-volumes.yaml -f docker-compose-monitoring.yaml -f docker-compose-services.yaml up -d  
NOTE: Elasticsearch might take few minutes to setup  
\ms-rrts-at\client> npm run dev  
Client: http://localhost:3000/  
Elasticsearch: http://localhost:5601/ user: elastic password: ms_admin  
