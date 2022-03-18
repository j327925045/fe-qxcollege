<template>
  <div>
    <h3>Page1</h3>
    <h4>
      <router-link to="/components/routerBreadcrumb/page1/page11">page1-1</router-link>
    </h4>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Page1'
}
</script>
