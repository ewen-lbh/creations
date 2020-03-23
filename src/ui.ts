import { prompt } from 'enquirer'

const ask = async (question: string, type = 'input', defaultValue: any = null) => {
  const { ans } = await prompt({ message: question, type, name: 'ans', initial: defaultValue })
  return ans
}

export { ask }
