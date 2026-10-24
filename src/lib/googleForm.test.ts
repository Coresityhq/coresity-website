import { ENTRY, composeSubmission } from './googleForm'

describe('composeSubmission', () => {
  it('fuses the five answers into the Google Form’s two questions', () => {
    const body = composeSubmission({
      name: ' Ada ',
      email: 'ada@example.com',
      phone: '0810 000 0000',
      goal: 'Pass the ISO 45001 audit in March',
      outcome: 'Certified first time',
      help: 'Expert advice',
      situation: 'Policies drafted, nothing implemented',
      blocker: 'Don’t know how to run the internal audit',
    })

    expect(body.get(ENTRY.name)).toBe('Ada')
    expect(body.get(ENTRY.email)).toBe('ada@example.com')
    expect(body.get(ENTRY.phone)).toBe('0810 000 0000')
    expect(body.get(ENTRY.achieve)).toBe(
      'Goal: Pass the ISO 45001 audit in March\n\nSuccess looks like: Certified first time\n\nHelp needed: Expert advice'
    )
    expect(body.get(ENTRY.now)).toBe(
      'Current situation: Policies drafted, nothing implemented\n\nWhat is holding me back: Don’t know how to run the internal audit'
    )
  })

  it('leaves out the parts that were not answered', () => {
    const body = composeSubmission({
      name: 'Ada',
      email: 'ada@example.com',
      phone: '1',
      goal: 'Hire two engineers',
      outcome: '',
      help: '',
      situation: 'Posted the job, no good applicants',
      blocker: '  ',
    })

    expect(body.get(ENTRY.achieve)).toBe('Goal: Hire two engineers')
    expect(body.get(ENTRY.now)).toBe(
      'Current situation: Posted the job, no good applicants'
    )
    expect([...body.keys()]).toHaveLength(5)
  })
})
