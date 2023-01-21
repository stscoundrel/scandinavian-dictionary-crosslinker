package template

import (
	"testing"
)

func TestDummyMethodReturnsLoremIpsum(t *testing.T) {
	const expected = "Lorem ipsum dolor sit amet"
	result := dummyMethod()

	if result != expected {
		t.Error("Did not return expected content. Received", result, "expected ", expected)
	}
}
