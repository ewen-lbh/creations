import {expect, test} from '@oclif/test'

describe('regen-records', () => {
  test
  .stdout()
  .command(['regen-records'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['regen-records', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
