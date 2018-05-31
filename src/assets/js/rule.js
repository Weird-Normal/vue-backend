let rules = {
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }, {
    min: 4,
    max: 20,
    message: '长度在 4 到 20 个字符'
  }, {
    pattern: /^[A-Za-z0-9]+$/,
    message: '用户名只能为字母和数字'
  }],
  email: [{
    required: true,
    message: '请输入邮箱',
    trigger: 'blur'
  }, {
    type: 'email',
    message: '邮箱格式不正确'
  }],
  age: [{
    required: true,
    message: '请输入年龄',
    trigger: 'blur'
  }, {
    type: 'number',
    message: '年龄只能为数字'
  }]
}

let updateRules = {
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }, {
    min: 4,
    max: 20,
    message: '长度在 4 到 20 个字符'
  }],
  email: [{
    type: 'email',
    message: '邮箱格式不正确'
  }],
  age: [{
    required: true,
    message: '年龄不能为空'
  }, {
    type: 'number',
    message: '年龄必须为数字值'
  }]
}

export default {
  rules: () => {
    return rules
  },
  updateRules: () => {
    return updateRules
  }
}
