from flask import Flask, render_template
import os

app = Flask(__name__)

DATA = {
    "name": "Narayana Namburi",
    "email": "narayananamburi111@gmail.com",
    "phone": "+91 6309559251",
    "linkedin": "https://www.linkedin.com/in/narayananamburi/",
    "location": "Bangalore, India",
    "stats": [
        {"value": "3+", "label": "Years Experience"},
        {"value": "15+", "label": "Cloud Environments"},
        {"value": "300+", "label": "AVD Users Served"},
        {"value": "3", "label": "Specializations"},
    ],
    "roles": [
        {
            "id": "cloud",
            "title": "Cloud Engineer",
            "summary": "Cloud Engineer with 3+ years architecting scalable Azure infrastructure. Certified Azure Administrator (AZ-104) with expertise in IaC (Terraform, Bicep), AVD, AKS, cloud governance, and security remediation.",
            "skills": [
                {"name": "Azure Core Services", "level": 92},
                {"name": "Terraform / Bicep", "level": 85},
                {"name": "Azure Virtual Desktop (AVD)", "level": 88},
                {"name": "Azure Kubernetes Service", "level": 80},
                {"name": "PowerShell / Azure CLI", "level": 85},
                {"name": "Azure Firewall / NSGs", "level": 82},
                {"name": "Azure Log Analytics", "level": 80},
                {"name": "Ansible", "level": 70},
            ],
            "achievements": [
                "Optimized FSLogix for Azure Virtual Desktop serving 300+ users",
                "Provisioned & managed 15+ cloud environments using IaC",
                "Built Azure Resource Graph inventory dashboard (React/Node.js)",
                "Executed comprehensive cloud security vulnerability remediations",
            ]
        },
        {
            "id": "data",
            "title": "Data Engineer",
            "summary": "Data & Platform Engineer with 3+ years specializing in cloud infrastructure automation, data pipeline orchestration, and secure file transfer mechanisms. Expert in Python, Log Analytics, and DataDog.",
            "skills": [
                {"name": "Python", "level": 85},
                {"name": "Azure Log Analytics", "level": 82},
                {"name": "DataDog", "level": 80},
                {"name": "SQL", "level": 78},
                {"name": "Docker / Kubernetes", "level": 80},
                {"name": "Azure Data Factory", "level": 72},
                {"name": "CrushFTP / MOVEit", "level": 85},
                {"name": "Apache Spark", "level": 60},
            ],
            "achievements": [
                "Migrated enterprise file transfers from MOVEit to CrushFTP",
                "Integrated Log Analytics & DataDog across 15+ environments",
                "Developed internal platform dashboard with React/Node.js",
                "Containerized apps with Docker via Azure DevOps CI/CD pipelines",
            ]
        },
        {
            "id": "devops",
            "title": "DevOps Engineer",
            "summary": "DevOps Engineer with 3+ years building reliable CI/CD pipelines, container orchestration (AKS/Docker), and automated cloud operations. Expert in Git-based workflows and IaC deployment strategies.",
            "skills": [
                {"name": "Azure DevOps / CI/CD", "level": 88},
                {"name": "Git / GitOps (ArgoCD)", "level": 85},
                {"name": "Docker", "level": 82},
                {"name": "Kubernetes (AKS)", "level": 82},
                {"name": "Terraform / Bicep", "level": 85},
                {"name": "Prometheus / Grafana", "level": 72},
                {"name": "Jenkins", "level": 72},
                {"name": "Ansible", "level": 70},
            ],
            "achievements": [
                "Designed automated CI/CD pipelines in Azure DevOps",
                "Managed AKS environments for continuous delivery & scaling",
                "Architected Git + Docker CI flow for internal platform dashboard",
                "Maintained 15+ IaC templates for staging/production environments",
            ]
        }
    ],
    "experience": [
        {
            "role": "Associate Platform Engineer",
            "company": "Sapiens",
            "location": "Bangalore",
            "period": "June 2025 – Present",
            "current": True,
            "points": [
                "Implemented and optimized FSLogix for Azure Virtual Desktop (AVD) for 300+ users",
                "Designed and optimized automated CI/CD pipelines within Azure DevOps",
                "Engineered a centralized Internal Platform Dashboard using React/Node.js with Azure Resource Graph",
                "Managed and scaled Azure Kubernetes Service (AKS) cluster workloads",
                "Strengthened cloud security posture via comprehensive vulnerability remediations and automated patching",
            ]
        },
        {
            "role": "Junior Associate Consultant",
            "company": "Sapiens",
            "location": "Bangalore",
            "period": "July 2023 – May 2025",
            "current": False,
            "points": [
                "Provisioned, configured, and maintained critical cloud infrastructure across 15+ environments using Terraform and Bicep",
                "Migrated enterprise file transfer workflows from MOVEit to CrushFTP, improving reliability and throughput",
                "Integrated Azure Log Analytics and DataDog across 15+ environments, reducing MTTR during cloud incidents",
                "Automated complex cloud administration workloads using Python and PowerShell scripts",
                "Enhanced CI/CD pipelines in Azure DevOps for accelerated deployment speeds",
            ]
        },
        {
            "role": "Junior Associate Consultant – Intern",
            "company": "Sapiens",
            "location": "Bangalore",
            "period": "Jan 2023 – June 2023",
            "current": False,
            "points": [
                "Gained hands-on experience in cloud environments, script deployment, and basic Azure operations",
                "Supported monitoring alerts and platform inventory tracking",
                "Implemented basic automation scripts and assisted with pipeline maintenance",
                "Contributed to DevOps runbooks and troubleshooting documentation",
            ]
        }
    ],
    "certifications": [
        {"name": "Azure Administrator Associate", "code": "AZ-104", "issuer": "Microsoft", "earned": True},
        {"name": "Azure Solutions Architect Expert", "code": "AZ-305", "issuer": "Microsoft", "earned": False},
        {"name": "DevOps Engineer Expert", "code": "AZ-400", "issuer": "Microsoft", "earned": False},
        {"name": "Azure Data Engineer Associate", "code": "DP-203", "issuer": "Microsoft", "earned": False},
        {"name": "Terraform Associate", "code": "TA-002-P", "issuer": "HashiCorp", "earned": False},
        {"name": "Certified Kubernetes Administrator", "code": "CKA", "issuer": "CNCF", "earned": False},
        {"name": "Databricks Data Engineer Associate", "code": "DCDE", "issuer": "Databricks", "earned": False},
    ],
    "education": {
        "degree": "B.Tech in Computer Science and Engineering",
        "institution": "Amrita School of Engineering, Bengaluru",
        "period": "2019 – 2023"
    }
}


@app.route('/')
def index():
    return render_template('index.html', data=DATA)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
