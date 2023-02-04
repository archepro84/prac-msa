## Build 요구사항

CLI에서 `protobuf`를 사용할 수 있는 환경을 구성합니다.

- `brew install protobuf`와 같은 방법으로 설치할 수 있습니다.

## Build Shell Script

``` shell
# ts-proto 패키지를 설치합니다.
npm install

# 컴파일된 파일을 저장하는 build 폴더가 존재하지 않을 경우 생성합니다.
mkdir -p build

# protobuf를 이용해 *.proto 파일들을 Typescript Interface 파일로 컴파일합니다.
protoc \
--plugin=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_out=./build *.proto \
--ts_proto_opt=outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false
```

### Links

- [Google Protocol Buffers](https://developers.google.com/protocol-buffers?hl=ko)
- [ts-proto](https://github.com/stephenh/ts-protohttps://github.com/stephenh/ts-proto)
