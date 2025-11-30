# 📘 Playwright Naming Conventions

This guide defines **naming conventions** for folders, files, classes, and functions in a Playwright TypeScript automation framework.
*Goal: clarity, consistency, and maintainability.*

---

## 📁 Folder Naming Convention

- Use **kebab-case** for all folder names.
- Makes folders URL-friendly, readable, and consistent.

### ✅ Examples
- tests/
- utils/
- config/

### ▶ Two or more words
- Always use kebab-case:
- login-page/
- test-data/

---

## 📄 File Naming Convention

- Base name and the purpose are **Separated by dot**.
- Industry standard in Playwright.

### 📌 Page Objects (page-objects/)
- login.page.ts
- user-profile.page.ts

### 📌 API Actions (api-actions/)
- auth.api.ts
- user.api.ts

### 📌 Tests (tests/)
- login.spec.ts
- user-profile.spec.ts

### 📌 Test Data (test-data/)
- users.data.ts
- products.data.ts

### 📌 Fixtures (fixtures/)
- auth.fixture.ts
- data-setup.fixture.ts

### 📌 Utilities / Helpers (utils/, helpers/)
- date.util.ts
- string.helper.ts

### 📌 Constants / Enums (constants/ enums/)
- roles.constants.ts
- urls.enums.ts

### 📌 Config (config/) 
- playwright.config.ts (root level for default configs)
- playwright.stg.config.ts

---

## 🧱 Class & Function Naming

### Classes → *PascalCase*
- LoginPage
- AuthAPI
- UserProfilePage

### Methods / Functions → *camelCase*
- async login(username, password) {}
- async getUser(id) {}
- navigateToDashboard()

---

## ✅ Summary

- Folder names → **kebab-case**
- File names → based on purpose (`.page.ts`, `.spec.ts`, `.api.ts`, etc.)
- Classes → *PascalCase*
- Methods / Functions → *camelCase*