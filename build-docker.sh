#!/bin/bash
docker build --tag=expresso .
docker run -p 8000:8000 --rm --name=expresso -it expresso
