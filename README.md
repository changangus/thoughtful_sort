# Thoughtful Sort

Package sorting function that classifies packages as **STANDARD**, **SPECIAL**, or **REJECTED** based on their dimensions and mass.

## Prerequisites

- Node.js >= 18

## Setup

```bash
npm install
```

## Usage

### With flags

```bash
npm run sort -- --width=100 --height=100 --length=100 --mass=10
```

### Interactive

```bash
npm run sort
```

You'll be prompted for each value:

```
Enter width (cm): 100
Enter height (cm): 100
Enter length (cm): 100
Enter mass (kg): 10
STANDARD
```

## Tests

```bash
npm test
```

### With UI

```bash
npm run test:ui
```

## Type checking

```bash
npm run typecheck
```
