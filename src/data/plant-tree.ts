export interface PlantNode {
  code: number
  name: string
  children?: PlantNode[]
}

interface PlantSeed {
  name: string
  workshops: [string, [string, string[]][]][]
}

const seeds: PlantSeed[] = [
  {
    name: '华东厂区',
    workshops: [
      [
        '机加车间',
        [
          ['机加工一线', ['ST-01', 'ST-04']],
          ['机加工二线', ['ST-07', 'ST-11']],
        ],
      ],
      [
        '注塑车间',
        [
          ['注塑一线', ['ST-21', 'ST-23']],
          ['注塑二线', ['ST-31', 'ST-33']],
        ],
      ],
    ],
  },
  {
    name: '华南厂区',
    workshops: [
      [
        '压铸车间',
        [
          ['压铸一线', ['ST-41', 'ST-44']],
          ['压铸二线', ['ST-47', 'ST-49']],
        ],
      ],
      [
        '装配车间',
        [
          ['总装一线', ['ST-51', 'ST-54']],
          ['总装二线', ['ST-57', 'ST-59']],
        ],
      ],
    ],
  },
  {
    name: '西部厂区',
    workshops: [
      [
        '机加车间',
        [
          ['机加工一线', ['ST-61', 'ST-64']],
          ['机加工二线', ['ST-67', 'ST-69']],
        ],
      ],
      [
        '包装车间',
        [
          ['包装一线', ['ST-71', 'ST-74']],
          ['包装二线', ['ST-77', 'ST-79']],
        ],
      ],
    ],
  },
  {
    name: '华北厂区',
    workshops: [
      [
        '热处理车间',
        [
          ['热处理一线', ['ST-81', 'ST-84']],
          ['热处理二线', ['ST-87', 'ST-89']],
        ],
      ],
      [
        '焊接车间',
        [
          ['焊接一线', ['ST-91', 'ST-94']],
          ['焊接二线', ['ST-97', 'ST-99']],
        ],
      ],
    ],
  },
  {
    name: '西南厂区',
    workshops: [
      [
        '机加车间',
        [
          ['机加工一线', ['ST-A1', 'ST-A4']],
          ['机加工二线', ['ST-A7', 'ST-A9']],
        ],
      ],
      [
        '涂装车间',
        [
          ['涂装一线', ['ST-B1', 'ST-B4']],
          ['涂装二线', ['ST-B7', 'ST-B9']],
        ],
      ],
    ],
  },
  {
    name: '东北厂区',
    workshops: [
      [
        '锻造车间',
        [
          ['锻造一线', ['ST-C1', 'ST-C4']],
          ['锻造二线', ['ST-C7', 'ST-C9']],
        ],
      ],
      [
        '检测车间',
        [
          ['检测一线', ['ST-D1', 'ST-D4']],
          ['检测二线', ['ST-D7', 'ST-D9']],
        ],
      ],
    ],
  },
]

const build = (): PlantNode[] =>
  seeds.map((plant, p) => ({
    code: (p + 1) * 1000,
    name: plant.name,
    children: plant.workshops.map(([workshop, lines], w) => ({
      code: (p + 1) * 1000 + (w + 1) * 100,
      name: workshop,
      children: lines.map(([line, stations], l) => ({
        code: (p + 1) * 1000 + (w + 1) * 100 + (l + 1) * 10,
        name: line,
        children: stations.map((station, s) => ({
          code: (p + 1) * 1000 + (w + 1) * 100 + (l + 1) * 10 + (s + 1),
          name: station,
        })),
      })),
    })),
  }))

export const plantTree: PlantNode[] = build()

export const findPlantNode = (code?: number): PlantNode | undefined => {
  if (!code) return undefined
  const walk = (nodes: PlantNode[]): PlantNode | undefined => {
    for (const node of nodes) {
      if (node.code === code) return node
      const hit = node.children ? walk(node.children) : undefined
      if (hit) return hit
    }
    return undefined
  }
  return walk(plantTree)
}

export const plantNamePath = (code: number): string => {
  const walk = (nodes: PlantNode[], trail: string[]): string[] | undefined => {
    for (const node of nodes) {
      const next = [...trail, node.name]
      if (node.code === code) return next
      const hit = node.children ? walk(node.children, next) : undefined
      if (hit) return hit
    }
    return undefined
  }
  return (walk(plantTree, []) ?? [String(code)]).join(' / ')
}
