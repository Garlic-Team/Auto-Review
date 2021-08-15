<div align="center">
    <h1><b>Auto Review</b></h1>
</div>

---

With this action, you can make a simple auto review system.

## Configuration

| Key            | Value                                                               | Suggested Type | Required | Default                                      |
| -------------- | ------------------------------------------------------------------- | -------------- | -------- | -------------------------------------------- |
| `GITHUB_TOKEN` | Personal github token. **recommend use GITHUB_TOKEN**               | `secret env`   | **Yes**  | N/A                                          |
| `EVENT_TYPE`   | Type of event will have `APPROVE`, `COMMENT` and `REQUEST_CHANGES`. | `env`          | No       | `APPROVE`                                    |
| `MESSAGE`      | Can add comment at event select.                                    | `env`          | No       | `Success approve. Enjoy 🏳️‍🌈🎉.`               |

**Example:**
```yml
name: Testing
on: [pull_request]
jobs:
  review:
    name: Review
    runs-on: ubuntu-latest
    steps:
      - name: Review
        uses: Garlic-Team/Auto-Review@1.0.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          EVENT_TYPE: APPROVE
          MESSAGE: 'Good Job 🐢 🧄'
```

**Example with ESLint:**
```yml
name: Testing
on: [pull_request]
jobs:
  lint:
    name: ESLint
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Install Node v12
        uses: actions/setup-node@v2
        with:
          node-version: 12

      - name: Install dependencies
        run: npm i

      - name: Run ESLint
        run: npm run test
        id: eslint
        continue-on-error: true

      - name: Success
        if: ${{ steps.eslint.outcome == 'success' }}
        uses: Garlic-Team/Auto-Review@1.0.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          EVENT_TYPE: APPROVE
          MESSAGE: 'Everything is fine.'

      - name: Failure
        if: ${{ steps.eslint.outcome != 'success' }}
        uses: Garlic-Team/Auto-Review@1.0.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          EVENT_TYPE: REQUEST_CHANGES
          MESSAGE: 'ESLint found errors. Please correct them. '
```
