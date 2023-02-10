# Shell Script를 싱행하는 현재 위치 정보압니다.
DEFAULT_PATH=$(pwd)
# ts-proto 패키지를 설치한 경로를 지정합니다.
TS_PROTO_PATH="$DEFAULT_PATH/node_modules/.bin/protoc-gen-ts_proto"
# 제외할 폴더 리스트를 저장합니다.
EXPORT_DIR=("node_modules")

# 특정 폴더를 제외합니다.
check_export_dir() {
  local directoryName="$1"

  for exportDir in "${EXPORT_DIR[@]}"; do
    if [ "$directoryName" = "$exportDir" ]; then
      return 0
    else
      return 1
    fi
  done
}

# protoc를 이용해 컴파일합니다.
build_by_protoc() {
  local directoryName="$1"

  # protobuf를 이용해 *.proto 파일들을 Typescript Interface 파일로 컴파일합니다.
  protoc \
    --plugin="$TS_PROTO_PATH" \
    --ts_proto_opt=outputEncodeMethods=false \
    --ts_proto_opt=outputJsonMethods=false \
    --ts_proto_opt=outputClientImpl=false \
    --ts_proto_out=./build ./*.proto
}

# build directory를 생성합니다.
create_build_directory() {
  local directoryName="$1"

  mkdir -p "$DEFAULT_PATH/$directoryName/build"
}

# working directory로 이동합니다.
working_directory() {
  local directoryName="$1"

  echo "$DEFAULT_PATH/$directoryName"

  cd "$DEFAULT_PATH/$directoryName"
}

main() {
  # ts-proto 패키지를 설치합니다.
  npm install

  # 모든 하위 폴더를 순회합니다.
  for dir_path in */; do
    local directoryName="${dir_path%/}"

    if check_export_dir "$directoryName"; then
      continue
    fi

    # 컴파일된 파일을 저장하는 build 폴더가 존재하지 않을 경우 생성합니다.
    create_build_directory "$directoryName"

    # 해당 폴더로 이동합니다.
    working_directory "$directoryName"

    # protobuf를 이용해 *.proto 파일들을 Typescript Interface 파일로 컴파일합니다.
    build_by_protoc "$directoryName"
  done
}

# 메인 로직을 실행합니다.
main
