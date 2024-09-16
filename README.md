# ananas-fe-shared

A collection of reusable TypeScript utilities designed to streamline development for both web and mobile teams.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

`npm`

Check out this link: https://github.com/ananasGit/ananas-fe-shared/pkgs/npm/ananas-fe-shared

`yarn` 

```
yarn add @ananasgit/ananas-fe-shared@https://github.com/ananasGit/ananas-fe-share.git#1.0.0
```

## Usage
Import the utility you need in your project
```
import { utility1, utility2 } from '@ananasgit/ananas-fe-shared';
```

## Upgrade / Specific version
`npm`

Check out this link: https://github.com/ananasGit/ananas-fe-shared/pkgs/npm/ananas-fe-shared

`yarn`

To use the latest / specific version of the repository set the version tag in the `package.json`
```
{
  ...
      "@ananasgit/ananas-fe-shared": "1.0.0",
  ...
}
```

# Releasing a New Version
To release a new version of this package, follow the steps below:

## Create a New Release:

- Navigate to the Releases section of the repository.
- Click "Draft a new release."
- Assign a new tag to the release. This tag should follow the format X.X.X (e.g., 1.0.2), where each part of the version string represents a different level of change (see Versioning section below).
- Ensure the new version is greater than the previous version tag.

## Versioning Guidelines:

A consistent versioning scheme helps users understand the evolution of the package over time. The following convention is recommended:

- The First number (e.g., 1.x.x) indicates significant changes that may affect backward compatibility.
Minor Version (1.Y.0):

- The Second number (e.g., 1.2.x) is incremented for smaller, backward-compatible updates.
Patch Version (1.0.Z):

- The Third number (e.g., 1.2.3) is for bug fixes or minor updates that do not affect compatibility.

## Versioning Rules:
Breaking Changes (Major Versions):

- Increment the major version (X) when introducing breaking changes. For example, when a component’s API is altered in a way that existing implementations will no longer work (e.g., removing required props or removing a component entirely).
Backward-Compatible Updates (Minor Versions):

- Increment the minor version (Y) for new features, improvements, or updates that are backward-compatible.
Bug Fixes & Minor Updates (Patch Versions):

- Increment the patch version (Z) for minor changes such as bug fixes or internal updates that do not affect the existing functionality or compatibility of the components.
