# API Reference

## Base URL
```
http://127.0.0.1:8000/api/
```

## Endpoints

### Skills

#### List All Skills
```http
GET /api/skills/
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Python",
    "svg_icon": "<svg>...</svg>"
  }
]
```

#### Get Single Skill
```http
GET /api/skills/{id}/
```

---

### Projects

#### List All Projects
```http
GET /api/projects/
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce application...",
    "tags": ["React", "Node.js", "MongoDB", "Stripe"],
    "imageUrl": "https://...",
    "liveUrl": "https://...",
    "githubUrl": "https://...",
    "isAiFeature": false,
    "skills": [
      {
        "id": 1,
        "name": "JavaScript",
        "svg_icon": "<svg>...</svg>"
      }
    ]
  }
]
```

#### Get Single Project
```http
GET /api/projects/{id}/
```

---

### Experience

#### List All Experience
```http
GET /api/experience/
```

**Response:**
```json
[
  {
    "id": 1,
    "company": "Tech Corp",
    "role": "Senior Full Stack Developer",
    "period": "Jan 2022 - Present",
    "description": [
      "Led development of microservices architecture serving 1M+ users",
      "Implemented CI/CD pipelines reducing deployment time by 60%"
    ],
    "skills": [
      {
        "id": 1,
        "name": "Python",
        "svg_icon": "<svg>...</svg>"
      }
    ]
  }
]
```

#### Get Single Experience
```http
GET /api/experience/{id}/
```

---

## Error Responses

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

---

## Notes

- All endpoints support only **GET** requests (read-only)
- No authentication required
- CORS enabled for `http://localhost:5173` and `http://127.0.0.1:5173`
- Response format: JSON
- All responses include related skills via nested serialization
