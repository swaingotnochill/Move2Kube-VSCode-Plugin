<h1 align="center">
  Move2Kube Extension for VS Code
</h1>

The [Move2Kube](https://move2kube.konveyor.io/) extension helps developers accelerate the process of re-platforming to Kubernetes by analyzing source files.

## Installation

Install the `move2kube` cli application in your machine first. This is a pre-requisite to run the extension.

Please visit the [Move2Kube Command Line Tool Installation](https://move2kube.konveyor.io/installation/cli) for step-by-step guide.

`NOTE: Please make sure move2kube is added to the path. Without that, the extension will not work and throw error.`

## Features

- Discover and create a plan file based on an input directory. (Work in progress)
- Transform artifacts using move2kube plan.

## Usage

- Right click on your folder where you would like to run `move2kube`.
- Select your desired `move2kube` option.
- The output will be generated in a `move2kubepluginoutput` folder which will be in the same level as the folder that was selected for the option.

## Code of Conduct

Refer to Konveyor's Code of Conduct [here](https://github.com/konveyor/community/blob/main/CODE_OF_CONDUCT.md).
