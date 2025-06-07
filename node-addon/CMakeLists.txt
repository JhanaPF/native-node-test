cmake_minimum_required(VERSION 3.5)
project(cpp_addon)

set(CMAKE_CXX_STANDARD 17)

include_directories(${CMAKE_JS_INC})
include_directories(${CMAKE_JS_INC} node_modules/node-addon-api)

add_library(cpp_addon SHARED src/addon.cpp)

set_target_properties(cpp_addon PROPERTIES PREFIX "" SUFFIX ".node")

target_link_libraries(cpp_addon ${CMAKE_JS_LIB})