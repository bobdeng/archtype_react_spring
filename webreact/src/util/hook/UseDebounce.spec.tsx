import {vi} from "vitest";
import {cleanup, render, waitFor} from "@testing-library/react";
import {useEffect, useState} from "react";
import {useDebounce} from "@/util/hook/UseDebounce";
import {userEvent} from "@storybook/testing-library";
import {MyInput} from "@/components/MyInput";
import {act} from "react-dom/test-utils";

interface TestDebounceProps {
  onChange: (value: string) => void;
}

function TestDebounce(props: TestDebounceProps) {
  const [value, setValue] = useState("")
  const debounceValue = useDebounce(value, 500)
  useEffect(() => {
    props.onChange(debounceValue)
  }, [debounceValue])
  return <div>
    <MyInput onChange={e => setValue(e.target.value)}/>
  </div>;
}

describe("防止输入变化事件触发太快", () => {
  beforeEach(() => {
    cleanup()
  })

  it('初始化的时候触发一次变化', async function () {
    vi.useFakeTimers();
    const onChange = vi.fn()
    const {getByRole} = render(<TestDebounce onChange={onChange}/>)
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith("")
  });

  it('初始化后，输入值，超时前不触发变化', async function () {
    vi.useFakeTimers();
    const onChange = vi.fn()
    const {getByRole} = render(<TestDebounce onChange={onChange}/>)
    await userEvent.type(getByRole('input'), "123");
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith("")
  });

  it('初始化后，输入值，超时后触发变化', async function () {
    vi.useFakeTimers();
    const onChange = vi.fn()
    const {getByRole} = render(<TestDebounce onChange={onChange}/>)
    await userEvent.type(getByRole('input'), "123");
    vi.resetAllMocks()
    await act(() => {
      vi.runAllTimers();
    })
    expect(onChange).toBeCalledWith("123")
  });
})