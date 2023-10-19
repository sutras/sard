import { Outlet } from 'react-router-dom'
import Layout from './Layout'
import Header from './Header'
import Sider from './Sider'
import Main from './Main'
import Content from './Content'
import Footer from './Footer'
import Catalog from '../catalog'
import Mobile from '../mobile'

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
