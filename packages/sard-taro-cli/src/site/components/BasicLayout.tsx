import { Outlet } from 'react-router-dom'
import Layout from './layout/Layout'
import Header from './layout/Header'
import Sider from './layout/Sider'
import Main from './layout/Main'
import Content from './layout/Content'
import Footer from './layout/Footer'
import Catalog from './catalog'
import Mobile from './mobile'

export default function BasicLayout() {
  return (
    <Layout>
      <Header></Header>
      <Layout>
        <Sider></Sider>
        <Content>
          <Main>
            <Outlet />
          </Main>
          <Footer></Footer>
        </Content>
        <Mobile></Mobile>
        <Catalog></Catalog>
      </Layout>
    </Layout>
  )
}
