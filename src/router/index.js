import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表板', icon: 'dashboard' }
    }]
  },

  {
    path: '/registered',
    component: Layout,
    redirect: '/registered/patient',
    name: 'Registered',
    meta: { title: '门诊挂号管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'patient',
        name: 'Patient',
        component: () => import('@/views/registered/patient/index'),
        meta: { title: '病人管理与导诊', icon: 'table' }
      },
      {
        path: 'registered',
        name: 'Registered',
        component: () => import('@/views/registered/registered/index'),
        meta: { title: '门诊预约/挂号', icon: 'tree' }
      },
      {
        path: 'triage',
        name: 'Triage',
        component: () => import('@/views/registered/triage/index'),
        meta: { title: '门诊分诊', icon: 'tree' }
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: () => import('@/views/registered/schedule/index'),
        meta: { title: '挂号周计划', icon: 'tree' }
      },
      {
        path: 'scheduling',
        name: 'Scheduling',
        component: () => import('@/views/registered/scheduling/index'),
        meta: { title: '日排班维护', icon: 'tree' }
      },
      {
        path: 'patientSelect',
        name: 'PatientSelect',
        component: () => import('@/views/registered/patientSelect/index'),
        meta: { title: '病人查询', icon: 'tree' }
      },
      {
        path: 'registeredSelect',
        name: 'RegisteredSelect',
        component: () => import('@/views/registered/registeredSelect/index'),
        meta: { title: '挂号票据查询', icon: 'tree' }
      }
    ]
  },

  {
    path: '/workstation',
    component: Layout,
    redirect: '/workstation/doctor',
    name: 'Workstation',
    meta: { title: '门诊医生工作站', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'doctor',
        name: 'Doctor',
        component: () => import('@/views/workstation/doctor/index'),
        meta: { title: '门诊就诊', icon: 'table' }
      },
      {
        path: 'recipeSelect',
        name: 'RecipeSelect',
        component: () => import('@/views/workstation/recipeSelect/index'),
        meta: { title: '医生处方查询', icon: 'tree' }
      },
      {
        path: 'doctorSelect',
        name: 'DoctorSelect',
        component: () => import('@/views/workstation/doctorSelect/index'),
        meta: { title: '就诊病人查询', icon: 'tree' }
      },
      {
        path: 'template',
        name: 'Template',
        component: () => import('@/views/workstation/template/index'),
        meta: { title: '模板维护', icon: 'tree' }
      },
      {
        path: 'medicalRecords',
        name: 'MedicalRecords',
        component: () => import('@/views/workstation/medicalRecords/index'),
        meta: { title: '门诊病历模板维护', icon: 'tree' }
      }
    ]
  },

  {
    path: '/charge',
    component: Layout,
    redirect: '/charge/charge',
    name: 'Charge',
    meta: { title: '门诊收费', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'charge',
        name: 'Charge',
        component: () => import('@/views/charge/charge/index'),
        meta: { title: '门诊收费', icon: 'table' }
      },
      {
        path: 'invoiceSelect',
        name: 'InvoiceSelect',
        component: () => import('@/views/charge/invoiceSelect/index'),
        meta: { title: '门诊发票查询', icon: 'tree' }
      },
      {
        path: 'costSelect',
        name: 'CostSelect',
        component: () => import('@/views/charge/costSelect/index'),
        meta: { title: '门诊费用明细查询', icon: 'tree' }
      }
    ]
  },

  {
    path: '/pharmacy',
    component: Layout,
    redirect: '/pharmacy/dispensing',
    name: 'Pharmacy',
    meta: { title: '药房管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'dispensing',
        name: 'Dispensing',
        component: () => import('@/views/pharmacy/dispensing/index'),
        meta: { title: '门诊发药', icon: 'table' }
      },
      {
        path: 'dispensingSelect',
        name: 'DispensingSelect',
        component: () => import('@/views/pharmacy/dispensingSelect/index'),
        meta: { title: '发药查询', icon: 'tree' }
      },
      {
        path: 'setDrug',
        name: 'SetDrug',
        component: () => import('@/views/pharmacy/setDrug/index'),
        meta: { title: '药房药品设置', icon: 'tree' }
      },
      {
        path: 'pharmacySelect',
        name: 'PharmacySelect',
        component: () => import('@/views/pharmacy/pharmacySelect/index'),
        meta: { title: '药房管理查询', icon: 'tree' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/baseTable',
    name: 'System',
    meta: { title: '系统维护', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'baseTable',
        name: 'BaseTable',
        component: () => import('@/views/system/baseTable/index'),
        meta: { title: '基本表维护', icon: 'table' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index'),
        meta: { title: '角色权限设置', icon: 'tree' }
      },
      {
        path: 'personnel',
        name: 'Personnel',
        component: () => import('@/views/system/personnel/index'),
        meta: { title: '人事与权限管理', icon: 'tree' }
      },
      {
        path: 'changePassword',
        name: 'ChangePassword',
        component: () => import('@/views/system/changePassword/index'),
        meta: { title: '修改密码', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
