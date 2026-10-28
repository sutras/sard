<template>
  <!-- 演示六种变体承载同一组现场动作：实心=主操作，描边/虚线=需授权，文字/链接=只读查询 -->
  <s-flex vertical gap="medium">
    <s-flex wrap gap="medium">
      <s-button color="primary" variant="solid" aria-label="下发工单">下发工单</s-button>
      <s-button color="primary" variant="outlined" aria-label="下发工单（描边）">下发工单</s-button>
      <s-button color="primary" variant="dashed" aria-label="下发工单（虚线）">下发工单</s-button>
      <s-button color="primary" variant="filled" aria-label="下发工单（浅底）">下发工单</s-button>
      <s-button color="primary" variant="text" aria-label="下发工单（文字）">下发工单</s-button>
      <s-button color="primary" variant="link" aria-label="下发工单（链接）">下发工单</s-button>
    </s-flex>
    <s-flex wrap gap="medium">
      <s-button color="secondary" variant="solid" aria-label="确认点检">确认点检</s-button>
      <s-button color="secondary" variant="outlined" aria-label="确认点检（描边）">
        确认点检
      </s-button>
      <s-button color="secondary" variant="dashed" aria-label="确认点检（虚线）">确认点检</s-button>
      <s-button color="secondary" variant="filled" aria-label="确认点检（浅底）">确认点检</s-button>
      <s-button color="secondary" variant="text" aria-label="确认点检（文字）">确认点检</s-button>
      <s-button color="secondary" variant="link" aria-label="确认点检（链接）">确认点检</s-button>
    </s-flex>
    <s-flex wrap gap="medium">
      <s-button color="success" variant="solid" aria-label="启动设备">启动设备</s-button>
      <s-button color="success" variant="outlined" aria-label="启动设备（描边）">启动设备</s-button>
      <s-button color="success" variant="dashed" aria-label="启动设备（虚线）">启动设备</s-button>
      <s-button color="success" variant="filled" aria-label="启动设备（浅底）">启动设备</s-button>
      <s-button color="success" variant="text" aria-label="启动设备（文字）">启动设备</s-button>
      <s-button color="success" variant="link" aria-label="启动设备（链接）">启动设备</s-button>
    </s-flex>
    <s-flex wrap gap="medium">
      <s-button color="warning" variant="solid" aria-label="申请停机">申请停机</s-button>
      <s-button color="warning" variant="outlined" aria-label="申请停机（描边）">申请停机</s-button>
      <s-button color="warning" variant="dashed" aria-label="申请停机（虚线）">申请停机</s-button>
      <s-button color="warning" variant="filled" aria-label="申请停机（浅底）">申请停机</s-button>
      <s-button color="warning" variant="text" aria-label="申请停机（文字）">申请停机</s-button>
      <s-button color="warning" variant="link" aria-label="申请停机（链接）">申请停机</s-button>
    </s-flex>
    <s-flex wrap gap="medium">
      <s-button color="danger" variant="solid" aria-label="触发急停">触发急停</s-button>
      <s-button color="danger" variant="outlined" aria-label="触发急停（描边）">触发急停</s-button>
      <s-button color="danger" variant="dashed" aria-label="触发急停（虚线）">触发急停</s-button>
      <s-button color="danger" variant="filled" aria-label="触发急停（浅底）">触发急停</s-button>
      <s-button color="danger" variant="text" aria-label="触发急停（文字）">触发急停</s-button>
      <s-button color="danger" variant="link" aria-label="触发急停（链接）">触发急停</s-button>
    </s-flex>
    <div class="bg-black p-1">
      <s-flex wrap gap="medium">
        <s-button color="white" variant="solid" aria-label="解除联锁">解除联锁</s-button>
        <s-button color="white" variant="outlined" aria-label="解除联锁（描边）">解除联锁</s-button>
        <s-button color="white" variant="dashed" aria-label="解除联锁（虚线）">解除联锁</s-button>
        <s-button color="white" variant="filled" aria-label="解除联锁（浅底）">解除联锁</s-button>
        <s-button color="white" variant="text" aria-label="解除联锁（文字）">解除联锁</s-button>
        <s-button color="white" variant="link" aria-label="解除联锁（链接）">解除联锁</s-button>
      </s-flex>
    </div>
    <div class="bg-white p-1">
      <s-flex wrap gap="medium">
        <s-button color="black" variant="solid" aria-label="查看趋势">查看趋势</s-button>
        <s-button color="black" variant="outlined" aria-label="查看趋势（描边）">查看趋势</s-button>
        <s-button color="black" variant="dashed" aria-label="查看趋势（虚线）">查看趋势</s-button>
        <s-button color="black" variant="filled" aria-label="查看趋势（浅底）">查看趋势</s-button>
        <s-button color="black" variant="text" aria-label="查看趋势（文字）">查看趋势</s-button>
        <s-button color="black" variant="link" aria-label="查看趋势（链接）">查看趋势</s-button>
      </s-flex>
    </div>
  </s-flex>
</template>
