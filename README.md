# Uman Project Setup

## Requirements

Before you begin, please ensure that your system meets the following requirements:

- Node.js version 18 or higher
- Yarn package manager

## Installation

To set up the Uman project, you will need to install the Lerna package globally using npm. Run the following command in your terminal:

```bash
sudo npm install -g lerna
```

## Project Setup

Follow these steps to set up the Uman project:

### Step 1: Navigate to the Project Directory

Open your terminal and navigate to the Uman project directory using the `cd` command:

```bash
cd /path/to/your/uman/project
```

### Step 2: Install Project Dependencies

Install the project dependencies using Yarn:

```bash
yarn
```

### Step 3: Build the Project

After installing the dependencies, build the project with the following command:

```bash
yarn build
```

### Step 4: Start the Owner App

To start the "owner" app, run the following command:

```bash
yarn owner:start
```

## Mono Repository Structure

The Uman project follows a mono repository structure. It is organized as follows:

```
Uman
├── shared
│   ├── blueprint
│   ├── providers
│   ├── utils
│   └── ... (other shared components)
├── apps
│   ├── owner
│   └── ... (other apps)
```

The "shared" directory contains common or shared components, while the "apps" directory contains specific applications, such as the "owner" app.
