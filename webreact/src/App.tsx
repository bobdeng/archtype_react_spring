import React, { useState } from 'react'
import 'antd-mobile/es/global'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/Home";
import { Profile, server } from "@/api/HttpServer";
import { useMount } from "@/util/hook/use-mount";

const App = () => {
  const [profile, setProfile] = useState<Profile | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  useMount(() => {
    server.getSession().then(resp => {
      if (resp.id === undefined) {
        window.location.href = "/admin/#/?from=/"
        return;
      }
      setProfile(resp);
    }).catch((e) => {
      window.location.href = "/admin/#/?from=/"
    }).finally(() => setLoading(false))
  })
  return <React.StrictMode>
    {
      profile &&
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    }
    {
      loading &&
        <div>检查登录</div>
    }
  </React.StrictMode>
}

export default App
