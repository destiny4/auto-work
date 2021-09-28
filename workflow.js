import execa from 'execa'
import Listr from 'listr'

export default args => {
  let tasks
  const {init,msg}=args
  console.log(args)
  if (!init) {
    tasks = new Listr([
      {
        title: 'git init',
        task: (ctx, task) =>
          execa('git', ['init']).catch(() => {
            task.skip('git init')
          })
      },
      {
        title: 'git add .',
        task: () => execa.command('git add .')
      },
      {
        title: `git commit -m "${msg}"`,
        task: () => execa.command(`git commit -m "${msg}"`)
      },
      {
        title: 'git push',
        task: () => execa.command('git push')
      }
    ])
  } else {
    tasks = new Listr([
      {
        title: 'git init',
        task: (ctx, task) =>
          execa('git', ['init']).catch(() => {
            task.skip('git init')
          })
      },
      {
        title: 'git add .',
        task: () => execa.command('git add .')
      },
      {
        title: 'git commit',
        task: () => execa.command('git commit -m "init"')
      },
      {
        title: 'git branch -M main',
        task: () => execa.command('git branch -M main')
      },
      {
        title:
          'git remote add origin https://github.com/destiny4/auto-work.git',
        task: () =>
          execa.command(
            'git remote add origin https://github.com/destiny4/auto-work.git'
          )
      },
      {
        title: 'git push -u origin main',
        task: () => execa.command('git push -u origin main')
      }
    ])
  }
  tasks.run().catch(err => {
    console.error(err)
  })
}
